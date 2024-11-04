import { axiosInstance } from "./axiosInstance";

// get all products
export const getProducts = async (page, perPage) => {
  try {
    const response = await axiosInstance.get(
      `/api/products?page=${page}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// get product by filters
export const getProductsByFilters = async (key, value) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/filters?${key}=${value}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get product by id
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
