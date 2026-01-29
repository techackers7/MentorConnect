"use client";
import React from "react";
import { useState } from "react";
const page = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    alert(data.message);
  };
  return (
    <div>
      <section className="min-h-screen bg-[#fbfaf4] flex items-center justify-center py-20">
        <div className="w-full max-w-md bg-white rounded-4xl shadow-2xl p-10">
          <h2 className="text-3xl font-extrabold text-blue-800 text-center mb-5">
            Forgot Password
          </h2>
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-900 py-3 font-bold text-white hover:bg-blue-800 transition disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
