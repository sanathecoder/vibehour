import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api" || "vibehour-production.up.railway.app/api",
  withCredentials: true,
});

export default API;