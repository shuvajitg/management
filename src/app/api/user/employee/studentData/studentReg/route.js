import Student from "@/model/student.mouel";
import { StudentDbConnect } from "@/lib/studentdb/connect";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

StudentDbConnect();
export async function POST(req) {
  try {
    const reqBody = await req.json();
    const {
      name,
      fatherName,
      cast,
      bladgroop,
      password,
      whatsAppNumber,
      dept,
      sem,
      regNo,
      email,
    } = reqBody;
    console.log(reqBody);

    const user = await Student.findOne({ regNo });
    if (user) {
      return NextResponse.json(
        {
          message: "User alredy exist",
        },
        {
          status: 400,
        }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newStudent = new Student({
      name,
      fatherName,
      cast,
      bladgroop,
      password: hashPassword,
      whatsAppNumber,
      dept,
      sem,
      regNo,
      email,
    });
    const savedUser = await newStudent.save();
    console.log(savedUser);
    return NextResponse.json(
      {
        message: "Student register sucessfully",
      },
      {
        status: 201,
      }
    );
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
