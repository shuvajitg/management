import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "User",
  },
  email: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "User",
  },
  password: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "User",
  },
  number: {
    type: mongoose.Schema.Types.ObjectId,
    Ref: "User",
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
