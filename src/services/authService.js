import axios from "axios";


const API_URL = "http://localhost:8083/back1/auth"; // Your backend URL

const BACKEND_CONNECT = true; // false = use mock, true = call real backend

// Mock login response JSON
const mockLoginResponse = {
  token: "mock-jwt-token-1234567890",
  user: {
    id: 1,
    username: "mockuser",
    email: "mockuser@example.com",
  },
};

export const login = async (username, password) => {
  if (!BACKEND_CONNECT) {
    const storedUser = JSON.parse(localStorage.getItem("users")) || [];
    
    // Find user by username
    const user = storedUser.find(u => u.username === username && u.password === password);
    
    if (user) {
      const token = "mock-jwt-token-1234567890"; // This is still a mock token in this case.
      localStorage.setItem("token", token);
      return { token, user }; // Return token and user for mock login
    } else {
      throw new Error("Invalid credentials!");
    }
  }

  const response = await axios.post(`${API_URL}/login`, { username, password });
  localStorage.setItem("token", response.data.token || response.data);
  return response.data;
};

export const signup = async (username, email, password) => {
  if (!BACKEND_CONNECT) {
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.some(user => user.username === username)) {
      throw new Error("User already exists!");
    }

    // Create new user and store in localStorage
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
