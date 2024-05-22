import User from "@/model/user.model";
import { UserDbConnect } from "@/lib/userdb/connect";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

UserDbConnect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "invalid password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      number: user.number,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log(token);

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
