import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedProducts } from "../../api/product";
import Card from "../../components/homePage/Card";
import { RotatingLines } from "react-loader-spinner";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
const Index = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoader(true);
    try {
      const response = await getSavedProducts();

      if (response.isSuccess) {
        setSavedProducts(response.productDocs);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      console.error(err.message);
    }
    setLoader(false);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <section className="w-[90%] mx-[5%] mt-10">
      <div className="flex justify-between my-5">
        <h1 className="text-xl font-bold my-4">Saved Product List</h1>
        <ArrowLeftIcon
          width={30}
          height={30}
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
      {loader ? (
        <div className=" flex items-center justify-center">
          <RotatingLines
            strokeColor="#3b82f6"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={loader}
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {savedProducts && savedProducts.length > 0 && (
            <>
              {savedProducts.map((product) => (
                <Card
                  product={product.product_id}
                  key={product._id}
                  saved={true}
                  getProducts={getProducts}
                />
              ))}
            </>
          )}
        </div>
      )}
      {savedProducts.length === 0 && !loader && (
        <p className=" font-medium text-red-600 my-2">
          No product are not saved yet.
        </p>
      )}
    </section>
  );
};

export default Index;
