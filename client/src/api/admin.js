import { axiosInstance } from "./axiosInstance";

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get(`/admin/products`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const approveProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-approve/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const rejectProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-reject/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const rollbackProduct = async (productId) => {
  try {
    const response = await axiosInstance.post(
      `/admin/product-rollback/${productId}`,
      {
        validateStatus: () => true,
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users", {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// ban user
export const banUser = async (userId) => {
  try {
    const response = await axiosInstance.post(`/admin/user-ban/${userId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// unban user
export const unBanUser = async (userId) => {
  try {
    const response = await axiosInstance.post(`/admin/user-unban/${userId}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
