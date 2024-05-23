import Admin from "@/model/admin.model";
import { AdminDbConnect } from "@/lib/admindb/connect";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

AdminDbConnect();

export async function PATCH(req) {
  try {
    const reqBody = await req.json();
    const { email, password, newEmail } = reqBody;

    const user = await Admin.findOne({ email });
    if (user) {
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          {
            error: "invalid password",
          },
          {
            status: 400,
          }
        );
      }
      const updateuserByEmail = await Admin.findByIdAndUpdate(user._id, {
        email: newEmail,
      });
      if (updateuserByEmail) {
        return NextResponse.json(
          {
            message: "this email alredy exist as a admin",
            sucess: user,
          },
          {
            status: 400,
          }
        );
      }
      return NextResponse.json(
        {
          message: "Admin update sucessfully",
        },
        {
          status: 201,
        }
      );
    }
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
