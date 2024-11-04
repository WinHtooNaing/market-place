import { useState } from "react";
import { getProductsByFilters } from "../../api/public";
import { message } from "antd";

const Filter = ({ setProducts, getAllProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const categoryHandler = async (i) => {
    try {
      setSelectedCategory(i);
      const response = await getProductsByFilters(
        "category",
        Categories[i].value
      );
      if (response.isSuccess) {
        setProducts(response.productDocs);
      } else {
        message.error("Nothing Products");
        setProducts([]);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const clearHandler = () => {
    setSelectedCategory("");
    getAllProducts();
  };
  const Categories = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronics_and_gadgets",
      label: "Electronics and Gadgets",
    },
    {
      value: "home_and_furniture",
      label: "Home and Furniture",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "books_and_media",
      label: "Books and Media",
    },
    {
      value: "sports_and_fitness",
      label: "Sports and Fitness",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
  ];
  return (
    <div className=" flex items-center gap-3 my-8 max-w-6xl mx-auto flex-wrap justify-center">
      {Categories.map((category, index) => (
        <p
          key={category.value}
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-blue-600 ${
            index === selectedCategory && "border-dashed"
          }`}
          onClick={() => categoryHandler(index)}
        >
          {category.label}
        </p>
      ))}
      {selectedCategory !== "" && (
        <button
          type="button"
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-red-600 text-white bg-red-600`}
          onClick={clearHandler}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Filter;
