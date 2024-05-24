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
      const updateuserEmail = await Admin.findByIdAndUpdate(user._id, {
        email: newEmail,
      });
      if (updateuserEmail) {
        return NextResponse.json(
          {
            message: "this email alredy exist as a admin",
          },
          {
            status: 400,
          }
        );
      }
      return NextResponse.json(
        {
          message: "Admin update sucessfully",
          sucess: user,
        },
        {
          status: 201,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "user not found",
        },
        {
          status: 400,
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
