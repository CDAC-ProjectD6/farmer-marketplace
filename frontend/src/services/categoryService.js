import api from "./api";

export const getAllCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const addCategory = async (category) => {
  const response = await api.post("/categories", category);
  return response.data;
};

export const updateCategory = async (id, category) => {
  const response = await api.put(`/categories/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

export const getActiveCategories = async () => {
  const response = await api.get("/categories/active");
  return response.data;
};

export const searchCategories = async (keyword) => {
  const response = await api.get("/categories/search", {
    params: { keyword },
  });

  return response.data;
};