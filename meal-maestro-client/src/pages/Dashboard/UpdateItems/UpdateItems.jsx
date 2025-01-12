import { FaUtensils } from "react-icons/fa6";
import SectionTitle from "../../../components/SectiontTtle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UpdateItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const itemData = useLoaderData();
  const { name, recipe, category, image, price, _id } = itemData;
  //   console.log(itemData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // return console.log(data);
    const imageFile = { image: data.image[0] };

    //send data to imgbb
    const { data: imgData } = await axiosPublic.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      imageFile,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(imgData.data.display_url);
    if (imgData.success) {
      // send data to server
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: imgData.data.display_url,
      };

      const { data: itemData } = await axiosSecure.patch(
        `/updateMenu/${_id}`,
        menuItem
      );
      console.log(itemData);
      if (itemData.modifiedCount) {
        toast.success("Food Item Added Successfully");
        reset();
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <SectionTitle
        subHeading={"What's New"}
        heading={"Update item"}
      ></SectionTitle>
      {/* form */}
      <div>
        <div className="max-w-6xl mx-auto bg-gray-200 rounded shadow-md p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="recipeName"
              >
                Recipe name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="recipeName"
                defaultValue={name}
                {...register("name", { required: true })}
                placeholder="Recipe name"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="category"
                >
                  Category<span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  defaultValue={category}
                  {...register("category", { required: true })}
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Category</option>
                  <option value="salad">Salad</option>
                  <option value="pizza">Pizza</option>
                  <option value="soup">Soup</option>
                  <option value="dessert">Dessert</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="price"
                >
                  Price<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  defaultValue={price}
                  {...register("price", { required: true })}
                  placeholder="Price"
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="recipeDetails"
              >
                Recipe Details<span className="text-red-500">*</span>
              </label>
              <textarea
                id="recipeDetails"
                defaultValue={recipe}
                {...register("recipe", { required: true })}
                placeholder="Recipe Details"
                rows="8"
                className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="file"
                id="fileUpload"
                {...register("image", { required: true })}
                className="file-input file-input-bordered file-input-warning w-full max-w-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 flex items-center justify-center gap-2 text-white font-medium py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors"
            >
              Update Item
              <FaUtensils></FaUtensils>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateItems;
