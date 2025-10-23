const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/authModels");

// 🔸 Generate Token Function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

// 🔹 Register Controller
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check existing user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile picture (from multer)
    let profilePic = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
    if (req.file) {
    
    profilePic = `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}`;
    }

    // Create user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePic,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(newUser._id),
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔹 Login Controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// 🔹 Profile Controller
exports.getProfile = async (req, res) => {
  try {
    // JWT থেকে user ID নাও
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password"); // password remove
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};