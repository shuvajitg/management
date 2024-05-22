import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name must be define"],
    uppercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    unique: [true, "password must be unique"],
    required: true,
  },
  number: {
    type: Number,
    required: [true, "enter number"],
  },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
