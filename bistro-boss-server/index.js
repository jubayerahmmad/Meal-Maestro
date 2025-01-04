require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 5000;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

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
    const userCollection = db.collection("users");
    const menuCollection = db.collection("menus");
    const reviewsCollection = db.collection("reviews");
    const cartsCollection = db.collection("carts");

    //USERS RELTED API
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
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.patch("/user/admin/:id", async (req, res) => {
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
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });

    // MENUS APIS
    // get menu data
    app.get("/menus", async (req, res) => {
      const result = await menuCollection.find().toArray();
      res.send(result);
    });
    // get reviews data
    app.get("/reviews", async (req, res) => {
      const result = await reviewsCollection.find().toArray();
      res.send(result);
    });

    // CARTS
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
