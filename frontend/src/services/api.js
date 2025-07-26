import axios from 'axios';

const BASE_URL = "https://ai-resumeanalyzer.onrender.com/api";

// Configure axios defaults
axios.defaults.withCredentials = true;

export const loginUser = async (email, password) => {
  const res = await axios.post(`${BASE_URL}/login`, {
    email,
    password
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post(`${BASE_URL}/auth/signup`, {
    name,
    email,
    password
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${BASE_URL}/auth/logout`);
  return res.data;
};

export const fetchProfile = async () => {
  const res = await axios.get(`${BASE_URL}/profile`);
  return res.data;
};
