// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
  const axiosPublic = useAxiosPublic();

  // const [menu, setMenu] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   fetch("https://bistro-boss-server-alpha.vercel.app/menus")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMenu(data);
  // setLoading(false);
  //     });
  // }, []);

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
