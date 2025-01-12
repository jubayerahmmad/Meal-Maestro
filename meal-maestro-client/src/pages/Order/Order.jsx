import orderImg from "../../assets/shop/banner2.jpg";
import useMenu from "../../hooks/useMenu";
import Cover from "../../shared/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderTab from "./OrderTab";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
  const [menu] = useMenu();
  const categories = ["salads", "pizzas", "soup", "desserts", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);
  const drinks = menu.filter((item) => item.category === "drinks");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const dessert = menu.filter((item) => item.category === "dessert");
  return (
    <div>
      <Helmet>
        <title>Order - Meal Maestro</title>
      </Helmet>
      <Cover
        bg={orderImg}
        title={"Order"}
        description={"Would you like to try a dish?"}
      ></Cover>

      <div className="my-10 mx-auto w-11/12 lg:w-8/12">
        <div className="">
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>Salad</Tab>
              <Tab>Pizza</Tab>
              <Tab>Soup</Tab>
              <Tab>Dessert</Tab>
              <Tab>Drinks</Tab>
            </TabList>

            <TabPanel>
              <OrderTab items={salad}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={pizza}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={soup}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={dessert}></OrderTab>
            </TabPanel>
            <TabPanel>
              <OrderTab items={drinks}></OrderTab>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Order;
