import ProductForm from "../../components/productManage/ProductForm";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  return (
    <section className="mx-10">
      <ProductForm
        setActiveTabKey={setActiveTabKey}
        getProducts={getProducts}
        editMode={editMode}
        editProductId={editProductId}
      />
    </section>
  );
};

export default ManageProduct;
