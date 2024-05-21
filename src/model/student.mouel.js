import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
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
    unique: true,
  },
});
const Student =
  mongoose.models.students || mongoose.model("students", studentSchema);
export default Student;
