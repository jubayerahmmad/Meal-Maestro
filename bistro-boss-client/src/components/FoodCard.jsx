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
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
