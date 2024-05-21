import mongoose from "mongoose";

export default async function UserDbConnect() {
  try {
    const dbConnect = await mongoose.connect(process.env.MONGODB_URI / "Users");
    console.log(`Db connected sucessfull`);
  } catch (error) {
    console.log("Db connection failed: ", error);
    Process.exit(1);
  }
}
