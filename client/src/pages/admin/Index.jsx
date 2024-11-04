import { message, Tabs } from "antd";
import {
  ChartBarIcon,
  SwatchIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import Products from "./Products";
import Dashboard from "./Dashboard";
import Users from "./Users";
import General from "./General";
import { getAllProducts, getAllUsers } from "../../api/admin";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const { user } = useSelector((state) => state.reducer.user);
  const navigate = useNavigate();

  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingProducts, setPendingProducts] = useState(0);

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setTotalProducts(response.totalProducts);
        setPendingProducts(response.pendingProducts);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const getUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response.isSuccess) {
        setUsers(response.userDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const isAdmin = () => {
    if (user.role !== "admin") {
      navigate("/");
    }
  };
  useEffect(() => {
    isAdmin();
    getProducts();
    getUsers();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <ChartBarIcon width={20} />
          Dashboard
        </span>
      ),
      children: (
        <Dashboard
          products={products}
          users={users}
          totalProducts={totalProducts}
          pendingProducts={pendingProducts}
          setActiveTabKey={setActiveTabKey}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Manage Products
        </span>
      ),
      children: <Products products={products} getProducts={getProducts} />,
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <UsersIcon width={20} />
          Manage Users
        </span>
      ),
      children: <Users users={users} getUsers={getUsers} />,
    },

    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];
  const onChangeHandler = (key) => {
    setActiveTabKey(key);
  };
  return (
    <section className="w-[90%] ml-[5%] mt-5">
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
        size="large"
        className="max-sm:hidden"
      />
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="top"
        size="large"
        className="block sm:hidden"
      />
    </section>
  );
};

export default Index;
