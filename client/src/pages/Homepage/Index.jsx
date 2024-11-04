import { useEffect, useState } from "react";
import { getProducts } from "../../api/public";
import { message, Pagination } from "antd";
import Hero from "../../components/homePage/Hero";
import Filter from "../../components/homePage/Filter";
import Card from "../../components/homePage/Card";
import { getSavedProducts } from "../../api/product";
import { RotatingLines } from "react-loader-spinner";
import Footer from "../../components/Footer";
const Index = () => {
  const [products, setProducts] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loader, setLoader] = useState(false);
  const getAllProducts = async (page = 1, perPage = 6) => {
    setLoader(true);
    try {
      const response = await getProducts(page, perPage);
      if (response.isSuccess) {
        setProducts(response.productDocs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
    setLoader(false);
  };
  const getSaveProducts = async () => {
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
    getAllProducts();
    getSaveProducts();
  }, []);
  const handlePagination = (page, perPage) => {
    getAllProducts(page, perPage);
  };
  return (
    <>
      <section className="w-[80%] ml-[10%] mb-10 mt-20">
        <Hero setProducts={setProducts} getAllProducts={getAllProducts} />
        <Filter setProducts={setProducts} getAllProducts={getAllProducts} />
        {loader ? (
          <div className=" flex items-center justify-center ">
            <RotatingLines
              strokeColor="#3b82f6"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={loader}
            />
          </div>
        ) : (
          <>
            <div className=" grid grid-cols-3 gap-4 max-w-6xl mx-auto">
              {products.map((product) => (
                <Card
                  product={product}
                  key={product._id}
                  savedProducts={savedProducts}
                  getAllProducts={getAllProducts}
                />
              ))}
            </div>
            <div className=" flex mt-5 my-10 justify-end max-w-6xl mx-auto">
              <Pagination
                current={currentPage}
                total={totalPages * 6}
                onChange={handlePagination}
              />
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Index;
