import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    const client = await clientPromise;
    const db = client.db("Bridge");

    const collections = ["StudentData", "AlumniData"];
    let user, collectionName;

    for (const name of collections) {
      const found = await db.collection(name).findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
      if (found) {
        user = found;
        collectionName = name;
        break;
      }
    }

    if (!user) {
      return Response.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection(collectionName).updateOne(
      { _id: user._id },
      {
        $set: { password: hashedPassword },
        $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
      }
    );

    return Response.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
