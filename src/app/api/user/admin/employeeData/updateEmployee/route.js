import Employee from "@/model/employ.model";
import { EmployeeConnect } from "@/lib/employeedb/connect";
import { NextResponse } from "next/server";

EmployeeConnect();
export async function PATCH(req) {
  try {
    const reqBody = await req.json();
    const { updateSallary, newDept, employeeId } = reqBody;
    console.log(reqBody);
    const user = await Employee.findOne({ employeeId });
    if (!user) {
      return NextResponse.json(
        {
          message: "please enter a valid EmloyeeId",
        },
        {
          status: 400,
        }
      );
    }
    const updateEmployee = await Employee.findByIdAndUpdate(user._id, {
      sallary: updateSallary,
      dept: newDept,
    });
    return NextResponse.json(
      {
        message: "Employee update sucessfully",
        sucess: updateEmployee,
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
