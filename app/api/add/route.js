// import clientPromise from "@/lib/mongodb";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { role, email, password } = body;

//     if (!role || !email || !password) {
//       return Response.json(
//         { success: false, message: "Role, email, and password are required" },
//         { status: 400 },
//       );
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return Response.json(
//         { success: false, message: "Invalid email format" },
//         { status: 400 },
//       );
//     }

//     // Validate role
//     const validRoles = ["student", "mentor"];
//     if (!validRoles.includes(role)) {
//       return Response.json(
//         {
//           success: false,
//           message: "Invalid role. Must be 'student' or 'mentor'",
//         },
//         { status: 400 },
//       );
//     }

//      if (role === "student") {
//       const { name, skills } = body;

//       if (!name || !name.trim()) {
//         return Response.json(
//           { success: false, message: "Name is required for student" },
//           { status: 400 }
//         );
//       }

//       if (!Array.isArray(skills) || skills.length === 0) {
//         return Response.json(
//           {
//             success: false,
//             message: "At least one skill is required for student",
//           },
//           { status: 400 }
//         );
//       }

//       if (role === "mentor") {
//       const {
//         name,
//         degree,
//         YOG,
//         skills,
//         level,
//         Commitment,
//         serviceType,
//       } = body;

//       if (!name || !name.trim()) {
//         return Response.json(
//           { success: false, message: "Name is required for mentor" },
//           { status: 400 }
//         );
//       }

//       if (!degree || !degree.trim()) {
//         return Response.json(
//           { success: false, message: "Degree is required for mentor" },
//           { status: 400 }
//         );
//       }

//       if (!YOG) {
//         return Response.json(
//           {
//             success: false,
//             message: "Year of Graduation is required for mentor",
//           },
//           { status: 400 }
//         );
//       }

//       if (!Array.isArray(skills) || skills.length === 0) {
//         return Response.json(
//           {
//             success: false,
//             message: "At least one skill is required for mentor",
//           },
//           { status: 400 }
//         );
//       }

//       if (!level) {
//         return Response.json(
//           {
//             success: false,
//             message: "Target student level is required",
//           },
//           { status: 400 }
//         );
//       }

//       if (!Commitment) {
//         return Response.json(
//           {
//             success: false,
//             message: "Time commitment is required",
//           },
//           { status: 400 }
//         );
//       }

//       if (!serviceType) {
//         return Response.json(
//           {
//             success: false,
//             message: "Service type is required",
//           },
//           { status: 400 }
//         );
//       }
//     }
//     const client = await clientPromise;
//     const db = client.db("Bridge");

//     const collection =
//       role === "student"
//         ? db.collection("StudentData")
//         : db.collection("AlumniData");

//     const existingUser = await collection.findOne({ email });

//     if (existingUser) {
//       return Response.json(
//         {
//           success: false,
//           message: "Email already exists",
//         },
//         { status: 409 },
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = {
//       ...body,
//       password: hashedPassword,
//       createdAt: new Date(),
//     };

//     const result = await collection.insertOne(newUser);

//     return Response.json({
//       success: true,
//       message: "Registration successful",
//       insertedId: result.insertedId,
//     });
//   }catch (error) {
//     // Sanitized logging: avoid exposing sensitive info in production
//     if (process.env.NODE_ENV === "development") {
//       console.error("API ERROR:", error);
//     } else {
//       console.error("API ERROR:", {
//         message: error?.message || "Unknown error",
//         code: error?.code || "UNKNOWN",
//       });
//     }
//     return Response.json(
//       { success: false, message: "Server error" },
//       { status: 500 },
//     );
//   }
// }
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { role, email, password } = body;

    if (!role || !email || !password) {
      return Response.json(
        {
          success: false,
          message: "Role, email, and password are required",
        },
        { status: 400 },
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Role validation
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

    if (role === "student") {
      const { name, skills } = body;

      if (!name || !name.trim()) {
        return Response.json(
          { success: false, message: "Name is required for student" },
          { status: 400 },
        );
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        return Response.json(
          {
            success: false,
            message: "At least one skill is required for student",
          },
          { status: 400 },
        );
      }
    }

    if (role === "mentor") {
      const { name, degree, YOG, skills, level, Commitment, serviceType } =
        body;

      if (!name || !name.trim()) {
        return Response.json(
          { success: false, message: "Name is required for mentor" },
          { status: 400 },
        );
      }

      if (!degree || !degree.trim()) {
        return Response.json(
          { success: false, message: "Degree is required for mentor" },
          { status: 400 },
        );
      }

      if (!YOG) {
        return Response.json(
          {
            success: false,
            message: "Year of Graduation is required for mentor",
          },
          { status: 400 },
        );
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        return Response.json(
          {
            success: false,
            message: "At least one skill is required for mentor",
          },
          { status: 400 },
        );
      }

      if (!level) {
        return Response.json(
          {
            success: false,
            message: "Target student level is required",
          },
          { status: 400 },
        );
      }

      if (!Commitment) {
        return Response.json(
          {
            success: false,
            message: "Time commitment is required",
          },
          { status: 400 },
        );
      }

      if (!serviceType) {
        return Response.json(
          {
            success: false,
            message: "Service type is required",
          },
          { status: 400 },
        );
      }
    }

    const client = await clientPromise;
    const db = client.db("Bridge");

    const collection =
      role === "student"
        ? db.collection("StudentData")
        : db.collection("AlumniData");

    // Check existing user
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

    // Hash password
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
    if (process.env.NODE_ENV === "development") {
      console.error("API ERROR:", error);
    } else {
      console.error("API ERROR:", {
        message: error?.message || "Unknown error",
      });
    }

    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
