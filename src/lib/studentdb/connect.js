import mongoose from "mongoose";

export default async function StudentDbConnect() {
  try {
    const dbConnect = await mongoose.connect(
      process.env.MONGODB_URI / "Students"
    );
    console.log(`Db connected sucessfull`);
  } catch (error) {
    console.log("Db connection failed: ", error);
    Process.exit(1);
  }
}
