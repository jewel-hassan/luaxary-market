// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { FiTrash2, FiDownload } from "react-icons/fi"; // Delete & Download Icons

// const ProductList = () => {
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [message, setMessage] = useState("");
//     const [search, setSearch] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);

//     const BASE_URL = "http://localhost:2000/api/products";
//     const PRODUCTS_PER_PAGE = 9;

//     // 🔹 Fetch all products
//     const fetchProducts = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.get(BASE_URL, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setProducts(res.data);
//             setFilteredProducts(res.data);
//         } catch (error) {
//             console.error("Fetch Products Error:", error);
//             setMessage("❌ Failed to load products");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, []);

//     // 🔹 Handle Search
//     useEffect(() => {
//         const result = products.filter(
//             (p) =>
//                 p.title.toLowerCase().includes(search.toLowerCase()) ||
//                 p.model.toLowerCase().includes(search.toLowerCase())
//         );
//         setFilteredProducts(result);
//         setCurrentPage(1);
//     }, [search, products]);

//     // 🔹 Pagination
//     const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
//     const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
//     const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
//     const currentProducts = filteredProducts.slice(
//         indexOfFirstProduct,
//         indexOfLastProduct
//     );
//     const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

//     // 🔹 Delete product
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure to delete this product?")) return;
//         try {
//             const token = localStorage.getItem("token");
//             await axios.delete(`${BASE_URL}/${id}`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             setMessage("✅ Product deleted successfully");
//             fetchProducts(); // Refresh list
//         } catch (error) {
//             console.error("Delete Product Error:", error);
//             setMessage("❌ Failed to delete product");
//         }
//     };

//     // 🔹 Download image (fixed)
//     const handleDownload = async (image) => {
//         try {
//             const url = image.startsWith("http") ? image : `http://localhost:2000${image}`;
//             const response = await fetch(url);
//             const blob = await response.blob();
//             const blobUrl = window.URL.createObjectURL(blob);
//             const link = document.createElement("a");
//             link.href = blobUrl;
//             link.download = url.split("/").pop();
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//             window.URL.revokeObjectURL(blobUrl);
//         } catch (error) {
//             console.error("Download Error:", error);
//             setMessage("❌ Failed to download image");
//         }
//     };

//     // 🔹 Format Date
//     const formatDateTime = (dateStr) => {
//         const d = new Date(dateStr);
//         let hours = d.getHours();
//         const minutes = d.getMinutes();
//         const ampm = hours >= 12 ? "PM" : "AM";
//         hours = hours % 12 || 12;
//         const minStr = minutes < 10 ? `0${minutes}` : minutes;
//         return `${d.toLocaleDateString()} ${hours}:${minStr} ${ampm}`;
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 py-10 px-4">
//             <div className="max-w-7xl mx-auto">
//                 {/* 🔹 Create Product Button */}
//                 <div className="flex justify-end mb-6">
//                     <Link
//                         to="/createproduct"
//                         className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 font-semibold"
//                     >
//                         + Create Product
//                     </Link>
//                 </div>

//                 {/* 🔹 Header */}
//                 <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-8">
//                     Product Collection
//                 </h2>

//                 {/* 🔹 Search Box */}
//                 <div className="flex justify-center mb-10">
//                     <input
//                         type="text"
//                         placeholder="🔍 Search by Title or Model..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="w-full md:w-1/2 lg:w-1/3 border-2 border-pink-400 rounded-xl px-4 py-2 shadow-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-700 placeholder-gray-500"
//                     />
//                 </div>

//                 {/* 🔹 Product Grid */}
//                 {loading ? (
//                     <div className="text-center text-gray-500 text-lg animate-pulse">Loading...</div>
//                 ) : message ? (
//                     <div className="text-center text-red-500 font-semibold">{message}</div>
//                 ) : filteredProducts.length === 0 ? (
//                     <div className="text-center text-gray-600 text-lg">No products found.</div>
//                 ) : (
//                     <>
//                         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
//                             {currentProducts.map((product) => (
//                                 <div
//                                     key={product._id}
//                                     className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 border-2 border-indigo-200 flex flex-col items-center text-center relative group"
//                                 >
//                                     {/* 🔹 Image Container */}
//                                     <div className="relative w-48 h-48 mb-4">
//                                         <img
//                                             src={product.image?.startsWith("http") ? product.image : `http://localhost:2000${product.image}`}
//                                             alt={product.title}
//                                             className="w-full h-full object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300"
//                                         />

//                                         {/* 🔹 Model Overlay */}
//                                         <span className="absolute bottom-2 right-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
//                                             {product.model}
//                                         </span>

//                                         {/* 🔹 Delete & Download Buttons */}
//                                         <div className="absolute top-2 right-2 flex space-x-2">
//                                             <button
//                                                 onClick={() => handleDelete(product._id)}
//                                                 className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg"
//                                                 title="Delete Product"
//                                             >
//                                                 <FiTrash2 />
//                                             </button>
//                                             {product.image && (
//                                                 <button
//                                                     onClick={() => handleDownload(product.image)}
//                                                     className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-full shadow-lg"
//                                                     title="Download Image"
//                                                 >
//                                                     <FiDownload />
//                                                 </button>
//                                             )}
//                                         </div>
//                                     </div>

//                                     {/* 🔹 Title */}
//                                     <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.title}</h3>

//                                     {/* 🔹 Price */}
//                                     <p className="text-pink-600 font-bold text-lg mb-2">৳ {product.price}</p>

//                                     {/* 🔹 Date & Time */}
//                                     <p className="text-sm text-gray-500 font-medium">Created: {formatDateTime(product.createdAt)}</p>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* 🔹 Pagination */}
//                         {totalPages > 1 && (
//                             <div className="flex justify-center mt-10 space-x-2 flex-wrap">
//                                 {Array.from({ length: totalPages }, (_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => handlePageChange(index + 1)}
//                                         className={`px-4 py-2 rounded-xl border-2 font-semibold ${currentPage === index + 1
//                                             ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-indigo-400"
//                                             : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:text-indigo-700 transition"
//                                             }`}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProductList;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiTrash2, FiDownload } from "react-icons/fi";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api/products"; // ✅ Env variable
    const PRODUCTS_PER_PAGE = 9;

    // 🔹 Fetch all products
    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(BASE_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(res.data);
            setFilteredProducts(res.data);
        } catch (error) {
            console.error("Fetch Products Error:", error);
            setMessage("❌ Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 🔹 Handle Search
    useEffect(() => {
        const result = products.filter(
            (p) =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                (p.model && p.model.toLowerCase().includes(search.toLowerCase()))
        );
        setFilteredProducts(result);
        setCurrentPage(1);
    }, [search, products]);

    // 🔹 Pagination
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
    const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
    const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // 🔹 Delete product
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete this product?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("✅ Product deleted successfully");
            fetchProducts(); // Refresh list
        } catch (error) {
            console.error("Delete Product Error:", error);
            setMessage("❌ Failed to delete product");
        }
    };

    // 🔹 Download image
    const handleDownload = async (image) => {
        try {
            const url = image.startsWith("http") ? image : import.meta.env.VITE_API_BASE_URL + image;
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = url.split("/").pop();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download Error:", error);
            setMessage("❌ Failed to download image");
        }
    };

    // 🔹 Format Date
    const formatDateTime = (dateStr) => {
        const d = new Date(dateStr);
        let hours = d.getHours();
        const minutes = d.getMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        const minStr = minutes < 10 ? `0${minutes}` : minutes;
        return `${d.toLocaleDateString()} ${hours}:${minStr} ${ampm}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                {/* 🔹 Create Product Button */}
                <div className="flex justify-end mb-6">
                    <Link
                        to="/createproduct"
                        className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-300 font-semibold"
                    >
                        + Create Product
                    </Link>
                </div>

                {/* 🔹 Header */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-8">
                    Product Collection
                </h2>

                {/* 🔹 Search Box */}
                <div className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="🔍 Search by Title or Model..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/2 lg:w-1/3 border-2 border-pink-400 rounded-xl px-4 py-2 shadow-lg focus:ring-2 focus:ring-purple-400 focus:outline-none text-gray-700 placeholder-gray-500"
                    />
                </div>

                {/* 🔹 Product Grid */}
                {loading ? (
                    <div className="text-center text-gray-500 text-lg animate-pulse">Loading...</div>
                ) : message ? (
                    <div className="text-center text-red-500 font-semibold">{message}</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">No products found.</div>
                ) : (
                    <>
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            {currentProducts.map((product) => (
                                <div
                                    key={product._id}
                                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 border-2 border-indigo-200 flex flex-col items-center text-center relative group"
                                >
                                    {/* 🔹 Image Container */}
                                    <div className="relative w-48 h-48 mb-4">
                                        <img
                                            src={
                                                product.image?.startsWith("http")
                                                    ? product.image
                                                    : import.meta.env.VITE_API_BASE_URL + product.image
                                            }
                                            alt={product.title}
                                            className="w-full h-full object-cover rounded-2xl shadow-md group-hover:scale-105 transition-transform duration-300"
                                        />

                                        {/* 🔹 Model Overlay */}
                                        {product.model && (
                                            <span className="absolute bottom-2 right-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                                                {product.model}
                                            </span>
                                        )}

                                        {/* 🔹 Delete & Download Buttons */}
                                        <div className="absolute top-2 right-2 flex space-x-2">
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg"
                                                title="Delete Product"
                                            >
                                                <FiTrash2 />
                                            </button>
                                            {product.image && (
                                                <button
                                                    onClick={() => handleDownload(product.image)}
                                                    className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-full shadow-lg"
                                                    title="Download Image"
                                                >
                                                    <FiDownload />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* 🔹 Title */}
                                    <h3 className="text-lg font-semibold text-gray-800 truncate mb-1">{product.title}</h3>

                                    {/* 🔹 Price */}
                                    <p className="text-pink-600 font-bold text-lg mb-2">৳ {product.price}</p>

                                    {/* 🔹 Date & Time */}
                                    <p className="text-sm text-gray-500 font-medium">Created: {formatDateTime(product.createdAt)}</p>
                                </div>
                            ))}
                        </div>

                        {/* 🔹 Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center mt-10 space-x-2 flex-wrap">
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-4 py-2 rounded-xl border-2 font-semibold ${currentPage === index + 1
                                                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-indigo-400"
                                                : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:text-indigo-700 transition"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductList;

