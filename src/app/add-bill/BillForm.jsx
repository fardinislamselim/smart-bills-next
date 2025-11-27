"use client";

import instance from "@/hook/useAxios";
import { useState } from "react";

export default function BillForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [imagePreviewError, setImagePreviewError] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  function isValidEmail(v) {
    // simple email check
    return /^\S+@\S+\.\S+$/.test(v);
  }

  function validateUrl(url) {
    if (!url) return true;
    try {
      const u = new URL(url);
      return ["http:", "https:"].includes(u.protocol);
    } catch {
      return false;
    }
  }

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      e.amount = "Enter a valid amount greater than 0.";
    if (!category.trim()) e.category = "Category is required.";
    if (!date || Number.isNaN(new Date(date).getTime()))
      e.date = "Enter a valid date.";
    if (!description.trim()) e.description = "Description is required.";
    if (!email.trim() || !isValidEmail(email)) e.email = "Enter a valid email.";
    if (imageUrl && !validateUrl(imageUrl)) e.imageUrl = "Enter a valid image URL (http/https).";
    if (!location.trim()) e.location = "Location is required.";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setMessage(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        amount: Number(amount),
        category: category.trim(),
        date: date, // ISO yyyy-mm-dd from input
        description: description.trim(),
        email: email.trim(),
        image: imageUrl?.trim() || null,
        location: location.trim(),
      };

      // Use the correct path depending on your axios baseURL.
      // If instance.baseURL is "/api", call "/bills". Otherwise use "/api/bills".
      const res = await instance.post("/bills", payload, {
        headers: { Accept: "application/json" },
      });

      console.log("POST /bills response:", {
        status: res.status,
        url: res.config?.url,
        headers: res.headers,
        data: res.data,
      });

      const created = res.data;

      try {
        const stored = JSON.parse(localStorage.getItem("bills") || "[]");
        stored.unshift(created);
        localStorage.setItem("bills", JSON.stringify(stored));
      } catch (err) {
        console.warn("localStorage save failed:", err);
      }

      setMessage({ type: "success", text: "Bill created successfully." });

      // reset form
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setEmail("");
      setImageUrl("");
      setLocation("");
      setImagePreviewError(false);
      setErrors({});
    } catch (err) {
      console.error("Create bill error (client):", err);

      const serverMessage =
        err?.response?.data?.error ||
        err?.response?.data ||
        err?.response?.statusText ||
        err?.message;

      setMessage({
        type: "error",
        text:
          typeof serverMessage === "string"
            ? serverMessage
            : JSON.stringify(serverMessage).slice(0, 300),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      {message ? (
        <div
          className={`rounded px-4 py-2 text-sm ${
            message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
          }`}
        >
          {message.text}
        </div>
      ) : null}

      <div>
        <label className="block text-sm font-medium text-zinc-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
          placeholder="Frequent Power Outage in Mirpur"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
            className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
            placeholder="260"
          />
          {errors.amount && <p className="mt-1 text-xs text-red-600">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
            placeholder="Electricity"
          />
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
          />
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
          placeholder="Power cuts occur daily in the evening."
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
            placeholder="creator@gmail.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
            placeholder="Mirpur-10, Dhaka"
          />
          {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700">Image URL</label>
        <input
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            setImagePreviewError(false);
          }}
          className="mt-1 w-full rounded border px-3 py-2 text-sm bg-white"
          placeholder="https://i.ibb.co/vv4NCDMw/unnamed.jpg"
        />
        {errors.imageUrl && <p className="mt-1 text-xs text-red-600">{errors.imageUrl}</p>}

        {imageUrl ? (
          <div className="mt-3 flex items-start gap-3">
            <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border bg-gray-50">
              {/* use img for external preview */}
              {!imagePreviewError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageUrl}
                  alt="preview"
                  className="h-full w-full object-cover"
                  onError={() => setImagePreviewError(true)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-500">
                  Preview failed
                </div>
              )}
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="truncate">{imageUrl}</p>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl("");
                    setImagePreviewError(false);
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.imageUrl;
                      return next;
                    });
                  }}
                  className="rounded bg-gray-100 px-3 py-1 text-xs"
                >
                  Remove
                </button>
                <a
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border px-3 py-1 text-xs"
                >
                  Open
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-foreground px-4 py-2 text-sm font-medium text-background disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Create bill"}
        </button>

        <button
          type="button"
          onClick={() => {
            setTitle("");
            setAmount("");
            setCategory("");
            setDate("");
            setDescription("");
            setEmail("");
            setImageUrl("");
            setLocation("");
            setImagePreviewError(false);
            setErrors({});
            setMessage(null);
          }}
          className="rounded border px-4 py-2 text-sm"
        >
          Reset
        </button>
      </div>
    </form>
  );
}