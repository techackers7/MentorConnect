"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/me",{credentials:"include",});
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  checkAuth();
}, [pathname]);


  const handleLogout = async () => {
  await fetch("/api/logout", {
  method: "POST",
  credentials: "include",
});

  setIsLoggedIn(false);
  window.location.href = "/login";

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
          />
          <span className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-wide">
            Bridge
          </span>
        </Link>

        <div className="hidden md:flex gap-8 text-gray-600 font-medium text-sm">
          <NavLinks pathname={pathname} />
        </div>

        <div className="hidden md:flex gap-4">
          <AuthButtons isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        </div>

        <button
          className="md:hidden text-blue-900 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
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
            <AuthButtons
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              mobile
            />
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

const AuthButtons = ({ isLoggedIn, handleLogout, mobile }) => {
  const containerClass = mobile ? "flex flex-col gap-3" : "flex gap-3";
  const btnBase =
    "px-5 py-2 font-semibold rounded-full transition text-sm text-center";

  if (isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className={`${btnBase} bg-red-500 hover:bg-red-600 text-white shadow-lg w-full md:w-auto`}
      >
        Logout
      </button>
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
// "use client";

// import React, { useState, useEffect } from "react";

// import Link from "next/link";

// import Image from "next/image";

// import { usePathname, useRouter } from "next/navigation";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const pathname = usePathname();

//   const router = useRouter();

//   useEffect(() => {
//     const localToken = localStorage.getItem("token");

//     if (localToken) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await fetch("/api/logout", { method: "POST" });
//     } catch (error) {
//       console.error("Logout error:", error);
//     }

//     localStorage.removeItem("token");

//     localStorage.removeItem("user");

//     setIsLoggedIn(false);

//     router.replace("/");
//   };

//   return (
//     <nav className="bg-white shadow-md rounded-b-3xl mx-2 md:mx-5 mt-2 px-6 py-4 relative z-50">
//       {" "}
//       <div className="flex items-center justify-between">
//         {" "}
//         <Link href="/" className="flex items-center gap-2">
//           {" "}
//           <Image
//             src="/logo.png"
//             alt="Logo"
//             width={40}
//             height={40}
//             className="object-contain"
//           />{" "}
//           <span className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-wide">
//             Bridge{" "}
//           </span>
//           {" "}
//         </Link>
//         {" "}
//         <div className="hidden md:flex gap-8 text-gray-600 font-medium text-sm">
//           <NavLinks pathname={pathname} />{" "}
//         </div>
//         {" "}
//         <div className="hidden md:flex gap-4">
//           {" "}
//           <AuthButtons isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//           {" "}
//         </div>
//         {" "}
//         <button
//           className="md:hidden text-blue-900 focus:outline-none"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           aria-label="Toggle mobile menu"
//           aria-expanded={isMobileMenuOpen}
//         >
//           {" "}
//           {isMobileMenuOpen ? (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {" "}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//               {" "}
//             </svg>
//           ) : (
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               {" "}
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//               {" "}
//             </svg>
//           )}
//           {" "}
//         </button>
//         {" "}
//       </div>
//       {" "}
//       {isMobileMenuOpen && (
//         <div className="md:hidden mt-4 flex flex-col gap-4 pb-4 border-t border-gray-100 pt-4 animate-fadeIn">
//           <NavLinks pathname={pathname} mobile />{" "}
//           <div className="flex flex-col gap-3 mt-2">
//             {" "}
//             <AuthButtons
//               isLoggedIn={isLoggedIn}
//               handleLogout={handleLogout}
//               mobile
//             />
//             {" "}
//           </div>
//           {" "}
//         </div>
//       )}
//       {" "}
//     </nav>
//   );
// };

// const NavLinks = ({ pathname, mobile }) => {
//   const baseClass = mobile
//     ? "block py-2 text-base font-semibold hover:text-blue-600"
//     : "hover:text-blue-600 transition";

//   const activeClass = "text-blue-800 font-bold";

//   return (
//     <>
//       {" "}
//       <Link
//         href="/"
//         className={`${baseClass} ${pathname === "/" ? activeClass : ""}`}
//       >
//         Home {" "}
//       </Link>
//       {" "}
//       <Link
//         href="/alumniFilter"
//         className={`${baseClass} ${pathname === "/alumniFilter" ? activeClass : ""}`}
//       >
//          Alumni Finder {" "}
//       </Link>
//       {" "}
//       <Link
//         href="/network"
//         className={`${baseClass} ${pathname === "/network" ? activeClass : ""}`}
//       >
//          Your Network {" "}
//       </Link>
//       {" "}
//       <Link
//         href="/placement"
//         className={`${baseClass} ${pathname === "/placement" ? activeClass : ""}`}
//       >
//         Placement Helpdesk {" "}
//       </Link>
//       {" "}
//       <Link
//         href="/contact"
//         className={`${baseClass} ${pathname === "/contact" ? activeClass : ""}`}
//       >
//        Contact {" "}
//       </Link>
//       {" "}
//     </>
//   );
// };

// const AuthButtons = ({ isLoggedIn, handleLogout, mobile }) => {
//   const containerClass = mobile ? "flex flex-col gap-3" : "flex gap-3";

//   const btnBase =
//     "px-5 py-2 font-semibold rounded-full transition text-sm text-center";

//   if (isLoggedIn) {
//     return (
//       <button
//         onClick={handleLogout}
//         className={`${btnBase} bg-red-500 hover:bg-red-600 text-white shadow-lg w-full md:w-auto`}
//       >
//         Logout{" "}
//       </button>
//     );
//   }

//   return (
//     <div className={containerClass}>
//       {" "}
//       <Link
//         href="/login"
//         className={`${btnBase} border-2 border-blue-600 text-blue-600 hover:bg-blue-50`}
//       >
//         Login {" "}
//       </Link>
//       {" "}
//       <Link
//         href="/registration"
//         className={`${btnBase} bg-blue-900 hover:bg-blue-800 text-white shadow-lg`}
//       >
//          Sign Up {" "}
//       </Link>
//       {" "}
//     </div>
//   );
// };

// export default Navbar;
