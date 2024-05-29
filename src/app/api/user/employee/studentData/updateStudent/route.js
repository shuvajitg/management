import { StudentDbConnect } from "@/lib/studentdb/connect";
import Student from "@/model/student.mouel";
import { NextResponse } from "next/server";

StudentDbConnect();
export async function PATCH(req) {
  try {
    const reqBody = await req.json();
    const {
      name,
      fatherName,
      cast,
      whatsAppNumber,
      dept,
      sem,
      regNo,
      email,
      updatedBy,
    } = reqBody;
    console.log(reqBody);

    const user = await Student.findOne({ regNo });
    if (user) {
      const updateStudent = await Student.findByIdAndUpdate(user._id, {
        name,
        fatherName,
        cast,
        whatsAppNumber,
        dept,
        sem,
        email,
      });
      return NextResponse.json(
        {
          message: "Student update sucessfully",
          sucess: true,
          student: updateStudent,
        },
        {
          status: 201,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Student does not exist",
        sucess: false,
      },
      {
        status: 400,
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
