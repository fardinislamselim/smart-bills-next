import axios from "axios";
import { useAuth } from "@clerk/nextjs"; // Needed to get token (see note below)

// Create instance
const instance = axios.create({
  baseURL: "https://smart-bills-server-nine.vercel.app",
});

// Add request interceptor
instance.interceptors.request.use(async (config) => {
  // Get Clerk token
  // Clerk's getToken() returns a Promise with the JWT
  // This ONLY WORKS IN COMPONENTS or hooks -- see note below
  // So use a function (see below)
  return config;
});

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401/403
    if (error.response && [401, 403].includes(error.response.status)) {
      // With Clerk, sign-out: window.Clerk.signOut() (if using global Clerk object)
      // Or use router (with next/router) to redirect
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;