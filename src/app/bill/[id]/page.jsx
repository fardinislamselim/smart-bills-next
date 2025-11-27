"use client";

import instance from "@/hook/useAxios";
// import instanceance from "@/hook/useAxios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✔ App Router import
import { use, useEffect, useState } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import Swal from "sweetalert2";

export default function BillDetails({ params }) {
  const resolvedParams = use(params); // 👈 unwrap the Promise
  const { id } = resolvedParams;
  // const { id } = params;
  const router = useRouter();
  console.log(id);
  const { user, isSignedIn } = useUser();

  const [bill, setBill] = useState(null);
  const [isCurrentMonth, setIsCurrentMonth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const { data } = await instance.get(`/bills/${id}`);
        setBill(data);
        console.log(data)

        const billMonth = new Date(data.date).getMonth();
        const currentMonth = new Date().getMonth();

        setIsCurrentMonth(billMonth === currentMonth);
      } catch (err) {
        console.error("Failed to fetch bill details:", err);
        setBill(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  useEffect(() => {
    if (bill?.title) {
      document.title = `${bill.title} | Smart Bills`;
    }
  }, [bill]);

  const handlePayBill = async (e) => {
    e.preventDefault();

    const form = e.target;
    const payForm = {
      email: user?.emailAddresses?.[0]?.emailAddress || "",
      billId: id,
      username: user?.fullName || "",
      amount: bill.amount,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
      additionalInfo: form.additionalInfo.value,
    };

    try {
      await instance.post("/paid-bills", payForm);

      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your bill has been paid successfully.",
        confirmButtonColor: "#3B82F6",
      });

      setShowModal(false);
    } catch (err) {
      console.error("Payment failed:", err);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: err?.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center py-20">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center bg-base-200 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-error mb-2">
          Bill Not Found 😞
        </h2>
        <p className="text-base-content opacity-80 max-w-md mb-6">
          The bill you re looking for is unavailable.
        </p>
        <Link
          href="/bills"
          className="btn btn-primary btn-wide shadow-md hover:scale-105 transition-transform"
        >
          Back to Bills
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
        {bill.title}
      </h1>
      <p className="text-center text-gray-500 mb-10">
        View your bill details and complete payment easily.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={bill.image}
          alt={bill.title}
          className="rounded-2xl shadow-lg w-full object-cover h-[400px]"
        />

        <div className="rounded-2xl shadow-md p-6 space-y-4 bg-base-100 text-base-content">
          <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 font-semibold rounded-full">
            {bill.category}
          </span>

          <h2 className="text-2xl font-semibold text-primary">{bill.title}</h2>
          <p className="text-gray-600">{bill.description}</p>

          <div className="flex items-center gap-2 text-gray-700">
            <FaMoneyBillWave className="text-blue-500" />
            <span className="font-semibold">Amount:</span> ৳{bill.amount}
          </div>

          <div className="flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-blue-500" />
            <span className="font-semibold">Location:</span> {bill.location}
          </div>

          <p className="text-gray-700">
            <span className="font-semibold">Date:</span> {bill.date}
          </p>

          <button
            onClick={handleModalOpen}
            disabled={!isCurrentMonth}
            className={`btn w-full ${
              isCurrentMonth
                ? "btn-primary cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Pay Bill
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black/30">
          <form
            onSubmit={handlePayBill}
            className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full space-y-4 relative"
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-xl"
              onClick={handleModalClose}
            >
              ✕
            </button>

            <h3 className="font-bold text-center text-2xl text-blue-600">
              Pay Bill
            </h3>

            <label>Email</label>
            <input
              type="email"
              value={user?.emailAddresses?.[0]?.emailAddress || ""}
              readOnly
              className="input input-bordered w-full"
            />

            <label>Bill ID</label>
            <input
              type="text"
              value={id}
              readOnly
              className="input input-bordered w-full"
            />

            <label>Amount</label>
            <input
              type="number"
              value={bill.amount}
              readOnly
              className="input input-bordered w-full"
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              className="input input-bordered w-full"
              required
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="input input-bordered w-full"
              required
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={new Date().toISOString().split("T")[0]}
              readOnly
              className="input input-bordered w-full"
            />

            <label>Additional Info</label>
            <textarea
              name="additionalInfo"
              className="textarea textarea-bordered w-full"
            ></textarea>

            <button type="submit" className="btn btn-primary w-full">
              Submit Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
