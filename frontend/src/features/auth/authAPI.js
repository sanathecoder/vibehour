import API from "../../api/axios";

// Register User
export const registerUser = async (userData) => {

  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const getMe = async () => {
  const res = await API.get("/auth/me", {
    withCredentials: true,
  });
  return res.data;
};




// Login User
export const loginUser = async (userData) => {

  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};

// Logout User
export const logoutUserAPI = async () => {

  const response = await API.post(
    "/auth/logout"
  );

  return response.data;
};

// Get Logged In User
export const getProfileAPI = async () => {

  const response = await API.get(
    "/user/profile"
  );

  return response.data;
};