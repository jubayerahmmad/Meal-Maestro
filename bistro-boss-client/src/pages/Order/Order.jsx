import orderImg from "../../assets/shop/banner2.jpg";
import FoodCard from "../../components/FoodCard";
import useMenu from "../../hooks/useMenu";
import Cover from "../../shared/Cover";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import OrderTab from "./OrderTab";
const Order = () => {
  const { menu } = useMenu();
  const drinks = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const dessert = menu.filter((item) => item.category === "dessert");
  return (
    <div>
      <Cover
        bg={orderImg}
        title={"Order"}
        description={"Would you like to try a dish?"}
      ></Cover>

      <div className="my-10 mx-auto w-10/12">
        <div className="max-w-7xl mx-auto">
          <Tabs>
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