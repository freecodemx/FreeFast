import axios from "./axios";

export const getProductsRequest = async () => axios.get("/products");
export const getAllProductsRequest = async () => axios.get("/all/products");
export const createProductRequest = async (product) => axios.post("/products", product);
export const updateProductRequest = async (id, product) => axios.put(`/products/${id}`, product);
export const deleteProductRequest = async (id) => axios.delete(`/products/${id}`);
export const getProductRequest = async (id) => axios.get(`/products/${id}`);
