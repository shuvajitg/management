import AdminDbConnect from "./admindb/connect";
import EmployeeDbConnect from "./employeedb/connect";
import StudentDbConnect from "./studentdb/connect";
import UserDbConnect from "./userdb/connect";

export default async function ConnectDB() {
  try {
    await AdminDbConnect();
    await EmployeeDbConnect();
    await StudentDbConnect();
    await UserDbConnect();
    console.log("All Database connected sucessfully");
  } catch (error) {
    console.log("all Database is not sucessfully connected");
  }
}
