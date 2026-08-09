import api from "./api";

// =========================
// GET ALL PRODUCTS
// =========================
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// =========================
// GET PRODUCT BY ID
// =========================
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (product) => {
  const response = await api.post("/products", product);
  return response.data;
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (id, product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

// =========================
// AVAILABLE PRODUCTS
// =========================
export const getAvailableProducts = async () => {
  const response = await api.get("/products/available");
  return response.data;
};

// =========================
// ACTIVE PRODUCTS
// =========================
export const getActiveProducts = async () => {
  const response = await api.get("/products/active");
  return response.data;
};

// =========================
// SEARCH PRODUCTS
// =========================
export const searchProducts = async (keyword) => {
  const response = await api.get("/products/search", {
    params: {
      keyword,
    },
  });

  return response.data;
};

// =========================
// PRODUCT BY NAME
// =========================
export const getProductByName = async (name) => {
  const response = await api.get(`/products/name/${name}`);
  return response.data;
};

// =========================
// PRODUCTS BY CATEGORY ID
// =========================
export const getProductsByCategory = async (categoryId) => {
  const response = await api.get(`/products/category/${categoryId}`);
  return response.data;
};

// =========================
// PRODUCTS BY CATEGORY NAME
// =========================

export const getProductsByCategoryName = async (categoryName) => {

    const response = await api.get(
        `/products/category/name/${encodeURIComponent(categoryName)}`
    );

    return response.data;
};

// =========================
// PRODUCTS BY FARMER
// =========================
export const getProductsByFarmer = async (farmerId) => {
  const response = await api.get(`/products/farmer/${farmerId}`);
  return response.data;
};

// =========================
// PRODUCTS BY PRICE RANGE
// =========================
export const getProductsByPriceRange = async (
  minPrice,
  maxPrice
) => {
  const response = await api.get("/products/price", {
    params: {
      minPrice,
      maxPrice,
    },
  });

  return response.data;
};

// =========================
// PRODUCTS BY STOCK
// =========================
export const getProductsByStock = async (stock) => {
  const response = await api.get(`/products/stock/${stock}`);
  return response.data;
};