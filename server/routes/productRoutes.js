const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
} = require("../controllers/productController");
const protect = require("../utils/authMiddleware")


// 🔹 Routes
router.post("/create",protect, upload.single("image"), createProduct);
router.get("/",protect, getAllProducts);
router.get("/:id",protect, getSingleProduct);
router.delete("/:id",protect,deleteProduct);

module.exports = router;
