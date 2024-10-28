import { Tabs } from "antd";
import ProductForm from "../../components/productManage/ProductForm";

import Upload from "../../components/productManage/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
  manageTabKey,
}) => {
  const items = [
    {
      key: "1",
      label: <span className="flex items-start gap-2">Product Details</span>,
      children: (
        <ProductForm
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    editMode && {
      key: "2",
      label: <span className="flex items-start gap-2">Product Image</span>,
      children: (
        <Upload
          setActiveTabKey={setActiveTabKey}
          editProductId={editProductId}
        />
      ),
    },
  ];

  return (
    <section className="mx-10">
      <Tabs
        defaultActiveKey={manageTabKey}
        items={items}
        className="max-sm:hidden"
      />
    </section>
  );
};

export default ManageProduct;
