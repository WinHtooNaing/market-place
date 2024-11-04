import { message, Tabs } from "antd";
import {
  BellAlertIcon,
  SquaresPlusIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Product from "./Product";
import ManageProduct from "./ManageProduct";
import Notification from "./Notification";
import General from "./General";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/product";
import { getAllNoti } from "../../api/notification";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [manageTabKey, setManageTabKey] = useState("1");
  const [notifications, setNotifications] = useState([]);

  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const getNoti = async () => {
    try {
      const response = await getAllNoti();
      if (response.isSuccess) {
        setNotifications(response.notiDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (activeTabKey === "1") {
      setEditMode(false);
      setEditProductId(null);
    }
    getProducts();
    getNoti();
  }, [activeTabKey]);

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Products
        </span>
      ),
      children: (
        <Product
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          setEditProductId={setEditProductId}
          getProducts={getProducts}
          setManageTabKey={setManageTabKey}
        />
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SquaresPlusIcon width={20} />
          Manage Product
        </span>
      ),
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
          manageTabKey={manageTabKey}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: (
        <Notification notifications={notifications} getNoti={getNoti} />
      ),
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
