import axios from "axios";

// Hardcoded backend URLs
const LOCAL_API_URL = "http://localhost:8083/back1/auth";               // For local dev
const DOCKER_API_URL = "http://host.docker.internal:8083/back1/auth";   // For Docker container

// Choose which one to use
// Set to DOCKER_API_URL when running inside Docker
const API_URL = LOCAL_API_URL;

const BACKEND_CONNECT = true; // false = use mock, true = call real backend

export const login = async (username, password) => {
  if (!BACKEND_CONNECT) {
    const storedUser = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUser.find(u => u.username === username && u.password === password);
    if (user) {
      const token = "mock-jwt-token-1234567890";
      localStorage.setItem("token", token);
      return { token, user };
    } else throw new Error("Invalid credentials!");
  }

  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data.token || response.data);
  return response.data;
};

export const signup = async (username, email, password) => {
  if (!BACKEND_CONNECT) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.some(user => user.username === username)) throw new Error("User already exists!");
    const newUser = { username, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    return { message: "Mock signup successful" };
  }

  return axios.post(`${API_URL}/signup`, { username, email, password });
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
};
