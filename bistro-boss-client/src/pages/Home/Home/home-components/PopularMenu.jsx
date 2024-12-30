import SectionTitle from "../../../../components/SectiontTtle/SectionTitle";
import useMenu from "../../../../hooks/useMenu";
import MenuItemCard from "../../../../shared/MenuItemCard";

const PopularMenu = () => {
  const { menu } = useMenu();
  const popular = menu.filter((item) => item.category === "popular");

  return (
    <section>
      <SectionTitle
        subHeading={"Check it Out"}
        heading={"From Our Menu"}
      ></SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
        {popular.map((item) => (
          <MenuItemCard key={item._id} item={item}></MenuItemCard>
        ))}
      </div>
    </section>
  );
};

export default PopularMenu;
