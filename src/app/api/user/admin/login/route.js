import jwt from "jsonwebtoken";
import Admin from "@/model/admin.model";
import { AdminDbConnect } from "@/lib/admindb/connect";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

AdminDbConnect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const adminUser = await Admin.findOne({ email });
    if (!adminUser) {
      return NextResponse.json(
        {
          message: "Wrong email",
        },
        {
          status: 400,
        }
      );
    }
    const validPassword = await bcryptjs.compare(password, adminUser.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: adminUser._id,
      email: adminUser.email,
      password: adminUser.password,
    };
    const token = jwt.sign(tokenData, process.env.ADMIN_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);

    const response = NextResponse.json({
      message: "Admin Login Sucessfully",
      sucess: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
