import { MdDelete, MdEdit } from "react-icons/md";
import SectionTitle from "../../../components/SectiontTtle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";

const ManageItems = () => {
  const [menu, isLoading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const hanldeDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menuItem/${id}`);
        console.log(res.data);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <SectionTitle
        heading={"Manage items"}
        subHeading={"Hurry Up!"}
      ></SectionTitle>

      <div className="w-10/12 mx-auto mt-4">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead className="bg-orange-500 text-white ">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu?.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="font-bold">{item.name}</p>
                  </td>
                  <td>${item.price}</td>
                  <td className="flex gap-4 justify-center">
                    <Link
                      to={`updateItem/${item._id}`}
                      className="btn btn-sm btn-accent text-white"
                    >
                      <MdEdit size={20}></MdEdit>
                    </Link>
                    <button
                      onClick={() => hanldeDelete(item._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <MdDelete size={20}></MdDelete>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
