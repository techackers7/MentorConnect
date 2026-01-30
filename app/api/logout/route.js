import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logout successful!",
  });

  // Clear the HttpOnly cookie
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";

// export async function POST() {
//   cookies().set("token", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//     maxAge: 0,
//   });

//   return NextResponse.json({ success: true });
// }
