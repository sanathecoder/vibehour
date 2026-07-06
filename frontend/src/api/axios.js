import axios from "axios";

const API = axios.create({
  baseURL: "https://vibehour-production.up.railway.app",
  withCredentials: true,
});

export default API;