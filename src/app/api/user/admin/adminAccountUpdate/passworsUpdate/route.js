import Admin from "@/model/admin.model";
import { AdminDbConnect } from "@/lib/admindb/connect";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

AdminDbConnect();

export async function PATCH(req, res) {
  try {
    const reqBody = await req.json();
    const { email, password, newPassword } = reqBody;

    const user = await Admin.findOne({ email });
    if (user) {
      const validPassword = await bcryptjs.compare(password, user.password);
      if (validPassword) {
        const salt = await bcryptjs.genSalt(10);
        const hasshNewPasword = await bcryptjs.hash(newPassword, salt);
        const updateAdminPassword = await Admin.findByIdAndUpdate(user._id, {
          password: hasshNewPasword,
        });
        console.log(user);
        return NextResponse.json(
          {
            message: "user updated sucessfully",
            sucess: updateAdminPassword,
          },
          {
            status: 201,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: "enter a valid Admin password",
          },
          {
            status: 400,
          }
        );
      }
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
  } catch (error) {}
}
