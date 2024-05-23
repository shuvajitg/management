import { AdminDbConnect } from "@/lib/admindb/connect";
import Admin from "@/model/admin.model";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

AdminDbConnect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const admin = Admin({
      email,
      password: hashedPassword,
    });

    const saveAdmin = await admin.save();
    console.log(saveAdmin);

    return NextResponse.json({
      message: "Admin created successfully",
      success: true,
      saveAdmin,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
