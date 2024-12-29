import { Helmet } from "react-helmet-async";
import Cover from "../../shared/Cover";
import bg from "../../assets/menu/banner3.jpg";
import dessertBg from "../../assets/menu/dessert-bg.jpeg";
import pizzaBg from "../../assets/menu/pizza-bg.jpg";
import soupBg from "../../assets/menu/soup-bg.jpg";
import saladBg from "../../assets/menu/salad-bg.jpg";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../../components/SectiontTtle/SectionTitle";
import MenuCategory from "./MenuCategory";

const Menu = () => {
  const { menu, loading } = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const dessert = menu.filter((item) => item.category === "dessert");

  if (loading) {
    return <p>Loading Data...</p>;
  }

  return (
    <div>
      <Helmet>
        <title>Menu - Meal Maestro</title>
      </Helmet>
      {/* main cover */}
      <Cover
        bg={bg}
        title={"OUR MENU"}
        description={"Would You Like to Try a Dish"}
      ></Cover>

      <div className="w-10/12 mx-auto my-6">
        {/* offered */}
        <SectionTitle
          heading={"Todays Offer"}
          subHeading={"Don't Miss"}
        ></SectionTitle>
        <MenuCategory items={offered}></MenuCategory>
        {/* desserts */}
        <MenuCategory
          items={dessert}
          title={"Desserts"}
          coverImg={dessertBg}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></MenuCategory>
        {/* Pizzas */}
        <MenuCategory
          items={dessert}
          title={"Pizzas"}
          coverImg={pizzaBg}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></MenuCategory>
        {/* Salads */}
        <MenuCategory
          items={dessert}
          title={"Salads"}
          coverImg={saladBg}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></MenuCategory>
        {/* Soup */}
        <MenuCategory
          items={dessert}
          title={"Soup"}
          coverImg={soupBg}
          description={
            "Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          }
        ></MenuCategory>
      </div>
    </div>
  );
};

export default Menu;
