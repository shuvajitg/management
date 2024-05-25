import Employee from "@/model/employ.model";
import { EmployeeConnect } from "@/lib/employeedb/connect";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

EmployeeConnect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { password, employeeId } = reqBody;
    console.log(reqBody);

    const user = await Employee.findOne({ employeeId });
    if (!user) {
      return NextResponse.json(
        {
          message: "Incorrect employee Id",
        },
        {
          status: 400,
        }
      );
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      dept: user.dept,
      employeeId: user.employeeId,
      sallary: user.sallary,
      whatsAppNumber: user.whatsAppNumber,
    };
    const token = jwt.sign(tokenData, process.env.EMPLOYEE_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);

    const response = NextResponse.json({
      message: "Login sucessfull",
      sucess: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: error.mrssage,
      },
      {
        status: 500,
      }
    );
  }
}
