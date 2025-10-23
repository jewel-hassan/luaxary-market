const mongoose = require("mongoose");

// 🔹 User Schema তৈরি
const userSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String, // এখানে তুমি ছবির URL বা ফাইল পাথ রাখবে
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png", // না দিলে খালি থাকবে
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [4, "Username must be at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, 
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // createdAt ও updatedAt স্বয়ংক্রিয়ভাবে যুক্ত হবে
  }
);

// 🔹 User Model তৈরি
const User = mongoose.model("User", userSchema);

// 🔹 Export করা
module.exports = User;
