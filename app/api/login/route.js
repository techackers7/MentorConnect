// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     // Check JWT_SECRET is configured
//     if (!process.env.JWT_SECRET) {
//       console.error("JWT_SECRET is not configured");
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Server configuration error. Please contact support.",
//         },
//         { status: 500 },
//       );
//     }

//     const body = await req.json();
//     const { email, password, role } = body;

//     if (!email || !password || !role) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please provide email, password, and role.",
//         },
//         { status: 400 },
//       );
//     }

//     const client = await clientPromise;
//     const db = client.db("Bridge");

//     const collection =
//       role === "student"
//         ? db.collection("StudentData")
//         : db.collection("AlumniData");

//     const user = await collection.findOne({ email });

//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "User not found. Please register first." },
//         { status: 404 },
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, message: "Invalid credentials. Please try again." },
//         { status: 401 },
//       );
//     }

//     const token = jwt.sign(
//       { userId: user._id, email: user.email, role: role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" },
//     );

//     const response = NextResponse.json({
//       success: true,
//       message: "Login successful!",
//       token: token,
//       user: {
//         name: user.name,
//         email: user.email,
//         role: role,
//       },
//     });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 86400,
//       path: "/",
//     });

//     return response;
//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     return NextResponse.json(
//       { success: false, message: "Server error. Please try again later." },
//       { status: 500 },
//     );
//   }
// }
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Server configuration error. Please contact support.",
        },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { email, password, role } = body;

    if (!email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide email, password, and role.",
        },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("Bridge");

    const collection =
      role === "student"
        ? db.collection("StudentData")
        : db.collection("AlumniData");

    const user = await collection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found. Please register first." },
        { status: 404 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials. Please try again." },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful!",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        role: role,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 },
    );
  }
}