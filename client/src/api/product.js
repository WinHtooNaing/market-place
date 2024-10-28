import { axiosInstance } from "./axiosInstance";

export const sellProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/create-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/update-product", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload images
export const uploadImage = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload", formData, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getSavedImages = async (id) => {
  try {
    const response = await axiosInstance.get(`/product-images/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const deleteSavedImages = async (payload) => {
  try {
    const { productId, imgToDelete } = payload;
    const encodeImgToDelete = encodeURIComponent(imgToDelete);
    const response = await axiosInstance.delete(
      `/products/images/destroy/${productId}/${encodeImgToDelete}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
