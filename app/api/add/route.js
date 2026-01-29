import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { role, email, password } = body;

    if (!role || !email || !password) {
      return Response.json(
        { success: false, message: "Role, email, and password are required" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate role
    const validRoles = ["student", "mentor"];
    if (!validRoles.includes(role)) {
      return Response.json(
        {
          success: false,
          message: "Invalid role. Must be 'student' or 'mentor'",
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

    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      ...body,
      password: hashedPassword,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);

    return Response.json({
      success: true,
      message: "Registration successful",
      insertedId: result.insertedId,
    });
  } catch (error) {
    // Sanitized logging: avoid exposing sensitive info in production
    if (process.env.NODE_ENV === "development") {
      console.error("API ERROR:", error);
    } else {
      console.error("API ERROR:", {
        message: error?.message || "Unknown error",
        code: error?.code || "UNKNOWN",
      });
    }
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
