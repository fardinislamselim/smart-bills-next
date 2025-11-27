import axios from "axios";

// আপনার সার্ভারের URL দিন
const instance = axios.create({
  baseURL: "https://smart-bills-next-server.vercel.app", // আপনার ব্যাকএন্ড URL এখানে বসাবেন
  // withCredentials: true, // যদি কুকি ব্যবহার করেন
});

// ✅ Request Interceptor: এটি প্রতিবার রিকোয়েস্ট করার ঠিক আগ মুহূর্তে রান হয়
instance.interceptors.request.use(
  (config) => {
    // চেক করা হচ্ছে কোডটি ব্রাউজারে রান হচ্ছে কিনা
    if (typeof window !== "undefined") {
      // লোকাল স্টোরেজ থেকে টোকেন নেওয়া
      const token = localStorage.getItem("token"); 
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor (Optional: এরর হ্যান্ডলিং এর জন্য)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;