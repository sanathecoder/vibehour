import API from "../../api/axios";

// Get User Cart
export const fetchCart = async () => {

  const response = await API.get(
    "/cart"
  );

  return response.data;
};

// Add To Cart
export const addToCartAPI = async (cartData) => {

  const response = await API.post(
    "/cart/add",
    cartData
  );

  return response.data;
};

// Remove Product From Cart
export const removeFromCartAPI = async (id) => {

  const response = await API.delete(
    `/cart/${id}`
  );

  return response.data;
};