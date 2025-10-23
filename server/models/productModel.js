const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String, 
      default: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      required: [true, "Product image is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    model: {
      type: String,
      unique: true, 
      default: function () {
       
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        const randomLetter1 = letters.charAt(Math.floor(Math.random() * letters.length));
        const randomLetter2 = letters.charAt(Math.floor(Math.random() * letters.length));

        const randomNum = Math.floor(100 + Math.random() * 900); 
        return `${randomLetter1}${randomLetter2}${randomNum}`; 
      },
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
  },
  {
    timestamps: true, 
  }
);


const Product = mongoose.model("Product", productSchema);


module.exports = Product;
