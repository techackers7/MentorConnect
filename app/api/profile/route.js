import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;

    const client = await clientPromise;
    const db = client.db("Bridge");
    const collection =
      role === "student"
        ? db.collection("StudentData")
        : db.collection("AlumniData");

    const user = await collection.findOne({ _id: new ObjectId(userId) });
    if (!user) return NextResponse.json({ success: false }, { status: 404 });

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      role,
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ success: false }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, role } = decoded;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("Bridge");
    const collection =
      role === "student"
        ? db.collection("StudentData")
        : db.collection("AlumniData");

    delete body.email;
    delete body.password;
    delete body._id;

    await collection.updateOne({ _id: new ObjectId(userId) }, { $set: body });
    return NextResponse.json({ success: true, message: "Updated" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
