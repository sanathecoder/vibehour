import API from "../../api/axios";

// Get All Products
export const fetchProducts = async () => {

  const response = await API.get(
    "/products"
  );

  return response.data;
};

// Get Single Product
export const fetchSingleProduct = async (id) => {

  const response = await API.get(
    `/products/${id}`
  );

  return response.data;
};

// Get Featured Products
export const fetchFeaturedProducts = async () => {

  const response = await API.get(
    "/products/featured"
  );

  return response.data;
};