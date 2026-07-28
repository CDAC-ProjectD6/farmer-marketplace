import axios from "axios";

const BASE_URL = "http://localhost:8080/api/categories";

export const getAllCategories = () => {
    return axios.get(BASE_URL);
};

export const addCategory = (category) => {
    return axios.post(BASE_URL, category);
};

export const updateCategory = (id, category) => {
    return axios.put(`${BASE_URL}/${id}`, category);
};

export const deleteCategory = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};

export const getActiveCategories = () => {
    return axios.get(`${BASE_URL}/active`);
};

export const searchCategories = (keyword) => {
    return axios.get(`${BASE_URL}/search?keyword=${keyword}`);
};