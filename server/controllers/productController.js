const Product = require("../models/productModel");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ✅ Create Product
// exports.createProduct = async (req, res) => {
//   try {
//     const { title, price } = req.body;
//     const image = req.file ? `/uploads/products/${req.file.filename}` : undefined;

//     if (!title || !price) {
//       return res.status(400).json({ message: "Title and Price are required" });
//     }

//     const product = new Product({
//       title,
//       price,
//       image,
//     });

//     await product.save();
//     res.status(201).json({ message: "Product created successfully", product });
//   } catch (error) {
//     console.error("Create Product Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

exports.createProduct = async (req, res) => {
  try {
    const { title, price } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price are required" });
    }

    let imagePath;

    if (req.file) {
      // 🔹 Original uploaded image path
      const uploadedPath = req.file.path;

      // 🔹 Generate new filename
      const ext = path.extname(req.file.originalname);
      const newFilename = `${Date.now()}_${req.file.filename}`;
      const newPath = path.join(req.file.destination, newFilename);

      // 🔹 Overlay model text
      const model = `${Math.random().toString(36).substring(2, 4).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;

      // 🔹 Sharp: overlay text
      const svgText = `
        <svg width="500" height="500">
          <text x="95%" y="95%" font-size="20" fill="white" stroke="black" stroke-width="1" text-anchor="end" alignment-baseline="baseline">${model}</text>
        </svg>
      `;

      await sharp(uploadedPath)
        .resize(500, 500, { fit: "cover" })
        .composite([{ input: Buffer.from(svgText), gravity: "southeast" }])
        .toFile(newPath);

      // 🔹 Delete original uploaded image
      fs.unlinkSync(uploadedPath);

      imagePath = `/uploads/products/${newFilename}`;

      // Save model to DB
      req.body.model = model;
    }

    const product = new Product({
      title,
      price,
      image: imagePath,
      model: req.body.model,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Single Product by ID
exports.getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Get Single Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // delete image from uploads folder if exists
    if (product.image && product.image !== "https://cdn-icons-png.flaticon.com/512/847/847969.png") {
    //   const imagePath = path.join(__dirname, "..", product.image);
    const imagePath = path.join(__dirname, "..", product.image.replace(/^\//, ""));
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting image:", err.message);
      });
    }

    await Product.findByIdAndDelete(id);
   res.status(200).json({
  success: true,
  message: "Product deleted successfully",
});
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
