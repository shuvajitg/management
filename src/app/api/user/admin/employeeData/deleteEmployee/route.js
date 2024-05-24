import Employee from "@/model/employ.model";
import { EmployeeConnect } from "@/lib/employeedb/connect";
import { NextResponse } from "next/server";

EmployeeConnect();

export async function DELETE(req) {
  try {
    const reqBody = await req.json();
    const { employeeId } = reqBody;
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
    const deleteEmployee = await Employee.findByIdAndDelete(user._id);
    return NextResponse.json(
      {
        message: "Employee delete sucessfully",
        sucess: deleteEmployee,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
