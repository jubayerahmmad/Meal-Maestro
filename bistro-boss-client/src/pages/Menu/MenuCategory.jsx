import { Link } from "react-router-dom";
import Cover from "../../shared/Cover";
import MenuItemCard from "../../shared/MenuItemCard";

const MenuCategory = ({ items, title, coverImg, description }) => {
  return (
    <div className="my-6">
      {title && (
        <Cover bg={coverImg} title={title} description={description}></Cover>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {items.map((item) => (
          <MenuItemCard key={item._id} item={item}></MenuItemCard>
        ))}
      </div>
      <div className="text-center">
        <Link to={`/order/${title ? title : "salads"}`}>
          <button className="px-3 py-2 border-b-2 font-bold border-b-black rounded-md">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuCategory;
