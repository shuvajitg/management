import mongoose from "mongoose";
import { AdminDbName } from "@/dbName/dbname";

export async function AdminDbConnect() {
  try {
    mongoose.connect(`${process.env.MONGO_URI}/${AdminDbName}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit(1);
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
