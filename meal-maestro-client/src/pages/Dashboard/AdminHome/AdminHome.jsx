import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaUsers } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { BsMenuAppFill } from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { Helmet } from "react-helmet-async";

// barchart color
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

// piechart color
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// custom chart
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// piechart custom
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/admin-stats");
      return data;
    },
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ["order-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/order-stats");
      return data;
    },
  });

  const pieChartData = chartData.map((data) => {
    return { name: data?.category, value: data?.revenue };
  });

  const { users, orders, menuItems, revenue } = stats;
  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <h2 className="text-4xl font-semibold">
        Hi, Welcome Back {user?.displayName && user?.displayName}!
      </h2>

      <div className="stats stats-vertical lg:stats-horizontal bg-gradient-to-br from-gray-50 via-gray-200 to-gray-400 shadow w-full my-6">
        <div className="stat space-y-4">
          <div className="stat-title text-xl">Users</div>
          <div className="stat-value flex items-center gap-3">
            <FaUsers /> {users}
          </div>
        </div>

        <div className="stat space-y-4">
          <div className="stat-title text-xl">Orders</div>
          <div className="stat-value flex items-center gap-3">
            <FaListAlt /> {orders}
          </div>
        </div>

        <div className="stat space-y-4">
          <div className="stat-title text-xl">Menu Items</div>
          <div className="stat-value flex items-center gap-3">
            {" "}
            <BsMenuAppFill /> {menuItems}
          </div>
        </div>

        <div className="stat space-y-4">
          <div className="stat-title text-xl">Revenue</div>
          <div className="stat-value flex items-center gap-3">
            {" "}
            <FaDollarSign /> {revenue}
          </div>
        </div>
      </div>

      <div className="lg:flex justify-center items-center gap-4">
        {/* barchart */}
        <div>
          <BarChart
            width={380}
            height={300}
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        {/* piechart */}
        <div>
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
