"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false); // Prevents flicker
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // 1. Check LocalStorage instantly
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setIsLoggedIn(true);
      fetchUserProfile();
    } else {
      setIsLoggedIn(false);
    }
    // 2. Mark auth as checked so buttons can appear
    setIsAuthLoaded(true);
  }, [pathname]);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success) {
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error("Profile load error", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (e) {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserProfile(null);
    window.location.href = "/login";
  };

  const getAvatar = () => {
    if (!userProfile) return null; // Wait for data to load (Stops US flicker)
    if (userProfile.image) return userProfile.image;

    const name = userProfile.name || "User";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff&size=128&bold=true`;
  };

  return (
    <nav className="bg-white shadow-md rounded-b-3xl mx-2 md:mx-5 mt-2 px-6 py-4 relative z-50">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
          />
          <span className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-wide">
            Bridge
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-gray-600 font-medium text-sm">
          <NavLinks pathname={pathname} />
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {/* Only render buttons when auth check is done */}
          {isAuthLoaded ? (
            <AuthButtons
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              avatarUrl={isLoggedIn ? getAvatar() : null}
            />
          ) : (
            // Invisible placeholder prevents jump
            <div className="w-24 h-10"></div>
          )}
        </div>

        <button
          className="md:hidden text-blue-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-gray-100 pt-4 animate-fadeIn">
          <NavLinks pathname={pathname} mobile />
          <div className="flex flex-col gap-3 mt-2">
            {isAuthLoaded && (
              <AuthButtons
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                mobile
                avatarUrl={isLoggedIn ? getAvatar() : null}
              />
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = ({ pathname, mobile }) => {
  const baseClass = mobile
    ? "block py-2 text-base font-semibold hover:text-blue-600"
    : "hover:text-blue-600 transition";
  const activeClass = "text-blue-800 font-bold";
  return (
    <>
      <Link
        href="/"
        className={`${baseClass} ${pathname === "/" ? activeClass : ""}`}
      >
        Home
      </Link>
      <Link
        href="/alumniFilter"
        className={`${baseClass} ${pathname === "/alumniFilter" ? activeClass : ""}`}
      >
        Alumni Finder
      </Link>
      <Link
        href="/network"
        className={`${baseClass} ${pathname === "/network" ? activeClass : ""}`}
      >
        Your Network
      </Link>
      <Link
        href="/placement"
        className={`${baseClass} ${pathname === "/placement" ? activeClass : ""}`}
      >
        Placement Helpdesk
      </Link>
      <Link
        href="/contact"
        className={`${baseClass} ${pathname === "/contact" ? activeClass : ""}`}
      >
        Contact
      </Link>
    </>
  );
};

const AuthButtons = ({ isLoggedIn, handleLogout, mobile, avatarUrl }) => {
  const containerClass = mobile
    ? "flex flex-col gap-3"
    : "flex gap-3 items-center";
  const btnBase =
    "px-5 py-2 font-semibold rounded-full transition text-sm text-center";

  if (isLoggedIn) {
    return (
      <div className={containerClass}>
        <Link
          href="/profile"
          className="relative group flex items-center justify-center"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className={`rounded-full object-cover border-2 border-blue-600 hover:border-blue-800 transition ${mobile ? "w-12 h-12" : "w-10 h-10"}`}
            />
          ) : (
            <div
              className={`rounded-full bg-gray-200 animate-pulse border-2 border-gray-300 ${mobile ? "w-12 h-12" : "w-10 h-10"}`}
            ></div>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className={`${btnBase} bg-red-500 hover:bg-red-600 text-white shadow-lg w-full md:w-auto`}
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className={containerClass}>
      <Link
        href="/login"
        className={`${btnBase} border-2 border-blue-600 text-blue-600 hover:bg-blue-50`}
      >
        Login
      </Link>
      <Link
        href="/registration"
        className={`${btnBase} bg-blue-900 hover:bg-blue-800 text-white shadow-lg`}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default Navbar;
