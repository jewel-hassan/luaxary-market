const express = require("express")
const { registerUser, loginUser, getProfile } = require("../controllers/authController")
const upload = require("../utils/profilepicMiddleware")
const protect = require("../utils/authMiddleware")
const router = express.Router()



router.post("/register",upload.single("profilePic"),registerUser)
router.post("/login",loginUser)
router.get("/profile", protect, getProfile);


module.exports=router