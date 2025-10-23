import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const BASE_URL = "http://localhost:2000/api/products/create"; // ✅ তোমার backend URL

    // 🔹 Image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    // 🔹 Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        if (!title || !price) {
            setMessage("⚠️ Title and Price are required");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("price", price);
            if (image) formData.append("image", image);

            const token = localStorage.getItem("token");

            await axios.post(BASE_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage("✅ Product created successfully!");
            setTitle("");
            setPrice("");
            setImage(null);
            setPreview("");
        } catch (error) {
            console.error("Create Product Error:", error);
            setMessage("❌ Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-100 flex flex-col items-center py-10 px-4">
            {/* 🔹 Header & Navigation */}
            <div className="w-full max-w-7xl flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                    🛒 Create New Product
                </h2>
                <Link
                    to="/productlist"
                    className="px-5 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 font-semibold"
                >
                    + Product List
                </Link>
            </div>

            <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg border border-gray-100">
                {/* 🔹 Messages */}
                {message && (
                    <p
                        className={`text-center mb-4 font-medium ${message.includes("✅") ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {message}
                    </p>
                )}

                {/* 🔹 Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 🔹 Title */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Product Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter product title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-gray-700 placeholder-gray-400 transition"
                        />
                    </div>

                    {/* 🔹 Price */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Product Price
                        </label>
                        <input
                            type="number"
                            placeholder="Enter product price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-pink-300 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none text-gray-700 placeholder-gray-400 transition"
                        />
                    </div>

                    {/* 🔹 Image Upload */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Upload Product Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-gray-700"
                        />

                        {preview && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-2xl shadow-lg border border-gray-200 transition transform hover:scale-105"
                                />
                            </div>
                        )}
                    </div>

                    {/* 🔹 Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-2xl text-white font-bold transition-all duration-300 shadow-lg ${loading
                            ? "bg-indigo-300 cursor-not-allowed"
                            : "bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600"
                            }`}
                    >
                        {loading ? "Uploading..." : "Create Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;

