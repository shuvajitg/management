import Employee from "@/model/employ.model";
import { EmployeeConnect } from "@/lib/employeedb/connect";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

EmployeeConnect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { name, email, password, dept, whatsAppNumber } = reqBody;

    const employee = await Employee.findOne({ email });
    if (employee) {
      return NextResponse.json(
        {
          message: "this employee email alredy exist as a employee",
        },
        {
          status: 400,
        }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const newEmployee = new Employee({
      name,
      email,
      password: hashPassword,
      dept,
      whatsAppNumber,
    });
    const saveEmployee = await newEmployee.save();
    return NextResponse.json(
      {
        message: "employee created sucessfully",
        sucess: saveEmployee,
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
