import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ loggedIn: false }, { status: 401 });
    }

    jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({ loggedIn: true });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 401 });
  }
}
