import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { message } from "antd";
import { useState } from "react";
import { getProductsByFilters } from "../../api/public";
const Hero = ({ setProducts, getAllProducts }) => {
  const [searchKey, setSearchKey] = useState("");

  const searchHandler = async () => {
    if (searchKey.trim().length === 0) {
      return getAllProducts();
    }
    try {
      const response = await getProductsByFilters("searchKey", searchKey);
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        message.error("Product not Found");
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const clearHandler = () => {
    setSearchKey("");
    getAllProducts();
  };

  return (
    <div className="w-full text-center mb-2 mt-10">
      <h1 className="text-4xl max-sm:text-2xl font-bold text-blue-600 mb-4">
        "Discover, Connect, and Thrive with Market.io"
      </h1>
      <p className=" text-lg max-sm:text-base font-medium text-gray-500 max-w-xl mx-auto my-4">
        Bings buyers and sellers together, providing trust, community, and
        success. Explore, connect, and thrive with us.
      </p>
      <div className=" max-w-sm mx-auto flex items-center gap-2">
        <div className=" relative w-full">
          <input
            type="text"
            className=" bg-gray-200 outline-none p-2 rounded-xl w-full "
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchHandler();
              }
            }}
          />
          <MagnifyingGlassIcon
            width={22}
            height={22}
            className=" text-blue-600 absolute top-2 right-2 cursor-pointer"
            onClick={searchHandler}
          />
        </div>
        {searchKey && (
          <button
            type="button"
            className="text-sm font-medium text-white bg-blue-600 p-2 rounded-md"
            onClick={clearHandler}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
