import mongoose from "mongoose";

export default async function EmployeeDbConnect() {
  try {
    const dbConnect = await mongoose.connect(
      process.env.MONGODB_URI / "Employees"
    );
    console.log(`Db connected sucessfull`);
  } catch (error) {
    console.log("Db connection failed: ", error);
    Process.exit(1);
  }
}
