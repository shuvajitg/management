import User from "@/model/user.model";
import { UserDbConnect } from "@/lib/userdb/connect";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

UserDbConnect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { name, email, number, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "user alredy exist" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      number,
      password: hashPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      {
        message: "user created sucessfully",
        sucess: true,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
