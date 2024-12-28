import { useEffect, useState } from "react";
import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";
import MenuItemCard from "../../../../shared/MenuItemCard";

const PopularMenu = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItems = data.filter((item) => item.category === "popular");
        setMenu(popularItems);
      });
  }, []);
  return (
    <section>
      <SectionTitle
        subHeading={"Check it Out"}
        heading={"From Our Menu"}
      ></SectionTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {menu.map((item) => (
          <MenuItemCard key={item._id} item={item}></MenuItemCard>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
