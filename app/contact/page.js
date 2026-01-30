"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const statusTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
        statusTimerRef.current = null;
      }
    };
  }, []);

  const teamMembers = [
    { id: 1, name: "Girish Mahapatra", photo: "/team-girish.jpg" },
    { id: 2, name: "Abhisek Panda", photo: "/AbhiPic.jpg" },
    { id: 3, name: "Saranya Sarangi", photo: "/WhatsApp Image 2026-01-30 at 11.18.46 PM.jpg" },
    { id: 4, name: "Sunita Satapathy", photo: "/team-sunita.jpg" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any pending status timer
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Clear success message after 3 seconds
        statusTimerRef.current = setTimeout(() => {
          setStatus("");
        }, 3000);
      } else {
        setStatus("error");
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <>
    <div className="min-h-screen bg-[#fbfaf4] p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-16">
        <section className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          <div className="bg-blue-900 p-10 text-white md:w-2/5 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold mb-4">Get in Touch 🤝</h2>
              <p className="text-blue-200 text-sm mb-6">
                Have feedback on the Bridge platform? Found a bug? Or just want
                to say hi? We'd love to hear from you.
              </p>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <span className="bg-blue-800 p-2 rounded-full">📧</span>
                <p>techackers7@example.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-800 p-2 rounded-full">📍</span>
                <p>Bhubaneswar, Odisha</p>
              </div>
            </div>
          </div>

          <div className="p-10 md:w-3/5">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@college.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us what you think..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg disabled:opacity-50 flex justify-center"
              >
                {status === "loading" ? (
                  <span className="animate-pulse">Sending...</span>
                ) : status === "success" ? (
                  "Message Sent! ✅"
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-900 mb-10">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4 rounded-2xl overflow-hidden shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800">
                  {member.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

      </div>
      
    </div>
    <footer className="bg-blue-900 text-blue-100">
        <div className="flex justify-center p-4 font-extrabold text-center text-sm md:text-lg">
          <p>©2026 Bridge: Connecting Futures. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Contact;
