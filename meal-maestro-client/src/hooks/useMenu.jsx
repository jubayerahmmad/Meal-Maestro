import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: menu = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/menus");
      return data;
    },
  });

  return [menu, isLoading, refetch];
};

export default useMenu;
