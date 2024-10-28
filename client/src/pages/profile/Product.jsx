import { message } from "antd";
import moment from "moment";
import { deleteProduct } from "../../api/product";
const Product = ({
  products,
  setActiveTabKey,
  setEditMode,
  setEditProductId,
  getProducts,
  setManageTabKey,
}) => {
  const editHandler = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
  };
  const uploadHandler = (product_id) => {
    setEditMode(true);
    setActiveTabKey("2");
    setEditProductId(product_id);
    setManageTabKey("2");
  };
  const deleteHandler = async (product_id) => {
    try {
      const response = await deleteProduct(product_id);
      if (response.isSuccess) {
        message.success(response.message);
        getProducts();
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%] ml-[5%] mt-10">
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Sell Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((product, index) => (
                <>
                  <tr
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    key={product._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {moment(product.createdAt).format("L")}
                    </td>
                    <td className="px-6 py-4 ">
                      {product.status === "pending" ? (
                        <span className="text-sm bg-yellow-400 p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      ) : (
                        <span className="text-sm bg-red-400 p-1 rounded-md text-white">
                          {product.status}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="font-medium text-green-600 dark:text-blue-500 hover:underline me-3"
                        onClick={() => {
                          uploadHandler(product._id);
                        }}
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline me-3"
                        onClick={() => {
                          editHandler(product._id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="font-medium text-red-500 dark:text-red-500 hover:underline"
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Product;
