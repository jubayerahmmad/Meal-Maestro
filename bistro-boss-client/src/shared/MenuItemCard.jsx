const MenuItemCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="flex gap-6 items-center m-2">
      <img
        className="lg:w-28 w-16 object-cover rounded-tr-[200px] rounded-b-[200px]"
        src={image}
        alt="item"
      />
      <div>
        <h1 className="font-bold xl:text-3xl">{name}</h1>
        <p className="text-xs xl:text-lg">{recipe}</p>
      </div>
      <p className="text-orange-500 text-sm lg:text-lg">{price}</p>
    </div>
  );
};

export default MenuItemCard;
