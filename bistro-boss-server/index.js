require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

const verifyToken = async (req, res, next) => {
  // console.log("inside moddhomware", req.headers);
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Unauthorized User" });
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send({ message: "Unauthorized User" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.y41ia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const db = client.db("maestroDB");
    // --------------------COLLLEEEECCCKKKTIOOONS--------------------
    const userCollection = db.collection("users");
    const menuCollection = db.collection("menus");
    const reviewsCollection = db.collection("reviews");
    const cartsCollection = db.collection("carts");

    // verify admin after verifyToken
    const verifyAdmin = async (req, res, next) => {
      const email = req.user?.email;
      const query = { email };
      const user = await userCollection.findOne(query);
      const isAdmin = user?.role === "admin";
      if (!isAdmin) {
        res.status(403).send({ message: "FORBIDDEN ACCESS" });
      }
      next();
    };

    //-------------------JWT-------------------
    app.post("/login", (req, res) => {
      const userEmail = req.body;
      const token = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res.send({ token });
    });

    // -------------------USERS RELTED API-------------------
    app.post("/users", async (req, res) => {
      const userData = req.body;
      // insert email if user doesn't exist
      const isExist = await userCollection.findOne({ email: userData?.email });
      if (isExist) {
        return res.send({ message: "User Already exists" });
      }
      const result = await userCollection.insertOne(userData);
      res.send(result);
    });

    // get users data
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    // -----check admin-------
    app.get("/user/admin/:email", verifyToken, async (req, res) => {
      const email = req.params?.email;
      if (email !== req.user?.email) {
        res.status(403).send({ message: "Forbidden Access" });
      }
      const query = { email };
      const user = await userCollection.findOne(query);

      let admin = false;
      // if (user) {
      //   admin = user.role === "admin";
      // }
      if (user?.role === "admin") {
        admin = true;
      }
      res.send({ admin });
    });

    app.patch("/user/admin/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedRole = {
        $set: {
          role: "admin",
        },
      };
      const result = await userCollection.updateOne(filter, updatedRole);
      res.send(result);
    });

    // delete user
    app.delete("/user/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // -------------------MENUS APIS-------------------
    // get menu data
    app.get("/menus", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    // get menu item by id
    app.get("/menuItem/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: id };
      const result = await menuCollection.findOne(query);
      res.send(result);
    });
    // post menu items
    app.post("/menuItem", verifyToken, verifyAdmin, async (req, res) => {
      const menuItem = req.body;
      // console.log(menuItem);

      const result = await menuCollection.insertOne(menuItem);
      res.send(result);
    });
    // delete item
    app.delete("/menuItem/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });
    // update menu details
    app.patch("/updateMenu/:id", async (req, res) => {
      const menu = req.body;
      const id = req.params.id;
      const filter = { _id: id };
      const updatedDoc = {
        $set: {
          name: menu.name,
          recipe: menu.recipe,
          category: menu.category,
          price: menu.price,
          image: menu.image,
        },
      };
      const result = await menuCollection.updateOne(filter, updatedDoc);
      res.send(result);
    });

    // -------------------REVIEWS-------------------
    // get reviews data
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // -------------------CARTS-------------------
    // get cart
    app.get("/carts", async (req, res) => {
      const email = req.query.email;
      // console.log(email);

      const result = await cartsCollection.find({ email }).toArray();
      res.send(result);
    });

    // save carts
    app.post("/carts", async (req, res) => {
      const cartItem = req.body;
      const result = await cartsCollection.insertOne(cartItem);
      res.send(result);
    });

    // delete cart item by id
    app.delete("/cart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await cartsCollection.deleteOne(query);
      res.send(result);
    });

    // -------------PAYMENT INTENT-----------------
    app.post("create-payment-intent", async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      // create payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("MEAL IS GETTING COOKED!!!!!!");
});

app.listen(port, () => {
  console.log(`MEAL IS COOKING ON PORT ${port}`);
});
