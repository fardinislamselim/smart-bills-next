"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import instance from "@/hook/useAxios"; // উপরের ঠিক করা ফাইলটি ইমপোর্ট হবে
import dynamic from "next/dynamic";

const MyPayBills = () => {
  const { user, isSignedIn } = useUser();
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    address: "",
    phone: "",
    date: "",
  });
  const [theme, setTheme] = useState("light");
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Theme Watcher (SSR Safe)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");

      const observer = new MutationObserver(() => {
        setTheme(document.documentElement.getAttribute("data-theme") || "light");
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });

      return () => observer.disconnect();
    }
  }, []);

  // ✅ Fetch Bills
  const fetchBills = async () => {
    const email = user?.email || user?.primaryEmailAddress?.emailAddress;
    if (!email) return;

    try {
      setLoading(true);
      const { data } = await instance.get(`/paid-bills/user?email=${email}`);
      setBills(data || []);
    } catch (err) {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire("Error", "Failed to fetch bills.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) fetchBills();
  }, [user, isSignedIn]);

  const totalAmount = bills.reduce(
    (sum, bill) => sum + parseFloat(bill.amount || 0),
    0
  );

  const openUpdateModal = (bill) => {
    setSelectedBill(bill);
    setFormData({
      amount: bill.amount,
      address: bill.address,
      phone: bill.phone,
      date: bill.date?.split("T")[0],
    });
    setModalOpen(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBill) return;

    try {
      await instance.patch(`/paid-bills/${selectedBill._id}`, formData);
      const Swal = (await import("sweetalert2")).default;
      Swal.fire("Updated!", "Bill updated successfully.", "success");
      setModalOpen(false);
      fetchBills();
    } catch {
      const Swal = (await import("sweetalert2")).default;
      Swal.fire("Error", "Failed to update bill.", "error");
    }
  };

  const handleDelete = async (id) => {
    const Swal = (await import("sweetalert2")).default;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This bill will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await instance.delete(`/paid-bills/${id}`);
        Swal.fire("Deleted!", "Bill deleted successfully.", "success");
        fetchBills();
      } catch {
        Swal.fire("Error", "Failed to delete bill.", "error");
      }
    }
  };

  // ✅ Download Report (SSR Safe)
  const handleDownloadReport = async () => {
    if (!bills || bills.length === 0) return;

    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("My Paid Bills Report", 14, 22);

    doc.setFontSize(12);
    doc.text(`Total Bills Paid: ${bills.length}`, 14, 30);
    doc.text(`Total Amount: ৳${totalAmount.toLocaleString()}`, 14, 36);

    const tableColumn = [
      "Username",
      "Email",
      "Amount",
      "Address",
      "Phone",
      "Date",
    ];

    const tableRows = bills.map((bill) => [
      bill.username,
      bill.email,
      `৳${bill.amount}`,
      bill.address,
      bill.phone,
      bill.date ? new Date(bill.date).toLocaleDateString() : "",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 42,
    });

    doc.save(`my_pay_bills_${user?.email}.pdf`);
  };

  if (!isSignedIn) {
    return (
      <div className="text-center mt-20">
        <p className="text-lg">Please sign in to view your bills.</p>
      </div>
    );
  }

  return (
    <div
      className={
        theme === "dark"
          ? "bg-gray-900 text-gray-100 min-h-screen"
          : "bg-base-100 text-base-content min-h-screen"
      }
    >
      <div className="py-6 container mx-auto px-4 transition-colors duration-500">
        <div className="flex justify-between items-center pb-6">
          <h2 className="text-2xl font-bold">My Pay Bills</h2>
          <button
            className="btn btn-success text-white"
            onClick={handleDownloadReport}
            disabled={loading || bills.length === 0}
          >
            Download Report
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={bill._id}>
                    <td>{index + 1}</td>
                    <td>{bill.username}</td>
                    <td>{bill.email}</td>
                    <td>৳{bill.amount}</td>
                    <td>{bill.address}</td>
                    <td>{bill.phone}</td>
                    <td>
                      {new Date(bill.date).toLocaleDateString()}
                    </td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => openUpdateModal(bill)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(bill._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {modalOpen && (
          <dialog open className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">Update Bill</h3>
              <form onSubmit={handleUpdate}>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Amount"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Address"
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-2"
                  placeholder="Phone"
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-4"
                  required
                />
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-white"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default MyPayBills;