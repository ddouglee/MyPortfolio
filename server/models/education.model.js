import mongoose from "mongoose";
import crypto from "crypto";
const EducationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  firstname: {
    type: String,
    trim: true,
    required: "Name is required",
  },
    lastname: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
    description: {
    type: String,
    trim: true,
    required: "Description is required",
  },
  completion: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Education", EducationSchema);