import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
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
  isEmploy: {
    type: Boolean,
    default: true,
  },
  dept: {
    type: String,
    required: true,
    uppercase: true,
  },
});
const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;
