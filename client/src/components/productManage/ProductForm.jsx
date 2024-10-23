import { Checkbox, Form, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { getOldProduct, sellProduct, updateProduct } from "../../api/product";
import { useEffect, useState } from "react";

const ProductForm = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const options = [
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
  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "Accessories",
    },
    {
      label: "Warranty",
      value: "Warranty",
    },
    {
      label: "Vocher",
      value: "Vocher",
    },
  ];
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);

  const onFinishHandler = async (values) => {
    try {
      let response;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        response = await updateProduct(values);
      } else {
        response = await sellProduct(values);
      }
      if (response.isSuccess) {
        form.resetFields();
        message.success(response.message);
        getProducts();
        setActiveTabKey("1");
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  const getOldProductData = async () => {
    try {
      const response = await getOldProduct(editProductId);
      if (response.isSuccess) {
        const { name, description, price, usedFor, category, details, seller } =
          response.productDoc;
        const modifiedProduct = {
          name,
          description,
          price,
          used_for: usedFor,
          category,
          details,
        };
        setSellerId(seller);
        form.setFieldsValue(modifiedProduct);
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };
  useEffect(() => {
    if (editMode) {
      getOldProductData();
    } else {
      form.resetFields();
    }
  }, [editMode]);

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">
        {editMode ? "Edit your product here" : "What you want to sell "}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product name must contains.",
            },
          ]}
        >
          <Input placeholder="product name ..." />
        </Form.Item>
        <Form.Item
          name="description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Description must contains.",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <div className="flex gap-5 max-md:flex max-md:flex-col">
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Price must contains.",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="category"
            label="Choose a category"
            rules={[
              {
                required: true,
                message: "Category must choose.",
              },
            ]}
          >
            <Select defaultValue={""} options={options} />
          </Form.Item>

          <Form.Item
            name="used_for"
            label="Used for"
            rules={[
              {
                required: true,
                message: "Product's used time must write.",
              },
            ]}
          >
            <Input placeholder="eg, 3 months ago" />
          </Form.Item>
        </div>

        <Form.Item name="details" label="This product is have">
          <Checkbox.Group options={checkBoxOptions} defaultValue={[""]} />
        </Form.Item>
        <button
          type="submit"
          className=" font-medium text-lg text-center py-1 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full"
        >
          <SquaresPlusIcon width={30} />
          {editMode ? "Update Product" : "Sell Product"}
        </button>
      </Form>
    </section>
  );
};

export default ProductForm;
