const FoodCard = ({ item }) => {
  const { name, image, recipe, price } = item;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="w-full" src={image} alt="food" />
      </figure>
      <p className="bg-black text-white absolute right-2 top-2 px-4 rounded-xl">
        {price}
      </p>
      <div className="p-6 text-center space-y-3">
        <h2 className="text-2xl mb-2 font-bold">{name}</h2>
        <p className="text-sm">{recipe}</p>
        <div className="mt-3">
          <button className="btn btn-outline text-orange-600 bg-gray-200 hover:bg-orange-600 hover:border-none">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
