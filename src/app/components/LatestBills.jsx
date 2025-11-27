"use client";
// import instanceance from "@/hook/useAxios";
import instance from "@/hook/useAxios";
import { useEffect, useState } from "react";
import BillCard from "./BillCard";

const LatestBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // API route on Next.js side (proxy to your backend if needed)
        const { data } = await instance.get("/bills/latest6");
        // const data = await res.data;
        setBills(data);
      } catch (error) {
        console.error("Error fetching latest bills:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
        Latest Utility Bills
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bills.map((bill) => (
          <BillCard key={bill._id} bill={bill} />
        ))}
      </div>
    </div>
  );
};

export default LatestBills;
