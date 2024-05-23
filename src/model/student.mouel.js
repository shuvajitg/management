import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },
  fatherName: {
    type: String,
    required: true,
    uppercase: true,
  },
  cast: {
    type: String,
    required: true,
    default: "",
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
  whatsAppNumber: {
    type: Number,
    required: true,
  },
  isStudent: {
    type: Boolean,
    default: true,
  },
  dept: {
    type: String,
    required: true,
    uppercase: true,
  },
  sem: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
});
const Student =
  mongoose.models.students || mongoose.model("students", studentSchema);
export default Student;
