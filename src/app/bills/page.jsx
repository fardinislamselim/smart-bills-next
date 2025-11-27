"use client";

import instance from "@/hook/useAxios";
import Link from "next/link";
import { useEffect, useState } from "react";

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await instance.get("/bills/categories");
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch bills
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const url = selectedCategory
          ? `/bills?category=${selectedCategory}`
          : "/bills";
        const { data } = await instance.get(url);
        setBills(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching bills:", err);
        setBills([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto p-4">
      <title>Bills | Smart Bill</title>

      {/* Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="category" className="mr-2 font-semibold">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center flex-col items-center py-20">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      ) : (
        // Bills Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bills.length > 0 ? (
            bills.map((bill, index) => (
              <div
                key={bill._id ?? index}
                className="border rounded-lg shadow-lg p-4 flex flex-col"
              >
                {bill.image && (
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className="h-60 object-cover rounded mb-4"
                  />
                )}
                <h3 className="font-bold text-lg mb-1">{bill.title}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  Category: {bill.category}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  Location: {bill.location}
                </p>
                <p className="text-sm font-semibold mb-3">
                  Amount: ${bill.amount}
                </p>
                <Link
                  href={`/bill/${bill._id}`}
                  className="mt-auto btn btn-primary"
                >
                  See Details
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No bills found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BillsPage;
