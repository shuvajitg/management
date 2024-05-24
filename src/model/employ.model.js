import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
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
  isEmploy: {
    type: Boolean,
    default: true,
  },
  dept: {
    type: String,
    required: true,
    uppercase: true,
  },
  sallary: {
    type: Number,
    required: true,
  },
  whatsAppNumber: {
    type: Number,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
});
const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default Employee;
