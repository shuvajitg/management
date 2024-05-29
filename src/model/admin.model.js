import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    number: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
