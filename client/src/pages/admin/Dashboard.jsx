import { useEffect, useState } from "react";
import Cards from "../../components/dashboard/Cards";

import {
  BanknotesIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Chart from "../../components/dashboard/Chart";
import Bar from "../../components/dashboard/Bar";

const Dashboard = ({
  products,
  users,
  totalProducts,
  pendingProducts,
  setActiveTabKey,
}) => {
  const [totalSales, setTotalSales] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const calcTotalSales = () => {
    const totalAmount = products.reduce((a, b) => {
      return a + Number(b.price);
    }, 0);
    setTotalSales(totalAmount);
  };
  useEffect(() => {
    if (products.length) {
      calcTotalSales();
      setUserCount(users.length);
    }
  }, [products]);
  return (
    <section className="w-[95%] pl-[5%]">
      <div className="flex items-center gap-6 mt-2 mb-4">
        <div className=" w-full">
          <Cards
            title={"Total Sales"}
            count={`${totalSales} MMK`}
            icon={BanknotesIcon}
            note={"MMK"}
          />
        </div>
        <div onClick={() => setActiveTabKey("3")} className=" w-full">
          <Cards
            title={"Active Users"}
            count={userCount}
            icon={UserGroupIcon}
            note={"user"}
          />
        </div>
        <div onClick={() => setActiveTabKey("2")} className=" w-full">
          <Cards
            title={"Total Products"}
            count={totalProducts}
            icon={ShoppingCartIcon}
            note={"items"}
          />
        </div>
        <div onClick={() => setActiveTabKey("2")} className=" w-full">
          <Cards
            title={"Pending Products"}
            count={pendingProducts}
            icon={ShoppingCartIcon}
            note={"pending"}
          />
        </div>
      </div>
      <Chart products={products} />
      <Bar products={products} />
    </section>
  );
};

export default Dashboard;
