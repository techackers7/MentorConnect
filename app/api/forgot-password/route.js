import clientPromise from "@/lib/mongodb";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { success: false, message: "Email is required" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("Bridge");

    const student = await db.collection("StudentData").findOne({ email });
    const mentor = await db.collection("AlumniData").findOne({ email });

    const user = student || mentor;
    const collectionName = student
      ? "StudentData"
      : mentor
        ? "AlumniData"
        : null;

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    await db.collection(collectionName).updateOne(
      { email },
      {
        $set: {
          resetPasswordToken: token,
          resetPasswordExpires: expiry,
        },
      },
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_HOST?.replace(/\/$/, "");
    const resetLink = `${baseUrl}/resetPassword?token=${token}`;

    await transporter.sendMail({
      to: email,
      subject: "Reset your MentorConnect password",
      html: `
        <p>You requested a password reset.</p>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return Response.json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
