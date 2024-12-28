const MenuItemCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="flex gap-6 items-center m-2">
      <img
        className="w-28 object-cover rounded-tr-[200px] rounded-b-[200px]"
        src={image}
        alt="item"
      />
      <div>
        <h1 className="font-bold text-3xl">{name}</h1>
        <p>{recipe}</p>
      </div>
      <p className="text-orange-500">{price}</p>
    </div>
  );
};

export default MenuItemCard;
