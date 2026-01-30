"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // DEMO MODE: Test login without database
  //     if (email === "demo@test.com" && password === "demo123") {
  //       const token = "demo-token-" + Date.now();
  //       console.log("Demo login successful, token set:", token);
  //       alert("Demo Login Successful!");
  //       router.push("/");
  //       return;
  //     }

  //     // REAL LOGIN: Try actual API
  //     const res = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password, role }),
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.success) {
  //       // Store token in localStorage for client-side checking
  //       if (res.ok && data.success) {
  //         alert("Login Successful!");
  //         router.push("/");
  //       }

  //       alert("Login Successful!");
  //       router.push("/");
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     alert("Something went wrong. Please check your connection.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      alert("Login Successful!");
      router.replace("/");
      router.refresh();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong. Please check your connection.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="min-h-screen bg-[#fbfaf4] flex items-center justify-center py-20">
      <div className="w-full max-w-md bg-white rounded-4xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800">
            Welcome Back
          </h1>
          <p className="text-gray-500 mt-2">Login to continue</p>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <label
            className={`cursor-pointer px-4 py-2 rounded-full transition ${role === "student" ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-500"}`}
          >
            <input
              type="radio"
              name="role"
              value="student"
              checked={role === "student"}
              onChange={() => setRole("student")}
              className="hidden"
            />
            Student
          </label>
          <label
            className={`cursor-pointer px-4 py-2 rounded-full transition ${role === "mentor" ? "bg-blue-100 text-blue-800 font-bold" : "text-gray-500"}`}
          >
            <input
              type="radio"
              name="role"
              value="mentor"
              checked={role === "mentor"}
              onChange={() => setRole("mentor")}
              className="hidden"
            />
            Mentor
          </label>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
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

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-gray-100 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 font-bold text-xs"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-900 py-3 font-bold text-white hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex justify-end pt-1">
          <p>
            <Link
              className="font-bold text-blue-600 hover:underline text-sm"
              href="/forgotPassword"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/registration"
              className="font-bold text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
