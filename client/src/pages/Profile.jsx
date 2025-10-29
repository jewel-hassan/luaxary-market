




// // Profile.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     // 🔹 Fetch profile
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     setError("You are not logged in.");
//                     setLoading(false);
//                     return;
//                 }

//                 const config = {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 };

//                 const { data } = await axios.get(
//                     "http://localhost:2000/auth/profile", // আপনার API url দিন
//                     config
//                 );

//                 if (data.success) {
//                     setUser(data.user);
//                 } else {
//                     setError("Failed to fetch profile.");
//                 }
//             } catch (err) {
//                 setError(err.response?.data?.message || err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProfile();
//     }, []);

//     // 🔹 Logout function
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
//                 <p className="text-xl md:text-2xl font-semibold text-white animate-pulse">
//                     Loading...
//                 </p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-4">
//                 <p className="text-red-100 text-center font-bold text-lg md:text-xl">
//                     {error}
//                 </p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 flex flex-col items-center justify-center px-4 py-10">

//             {/* Header */}
//             <Link
//                 to="/"
//                 className="text-3xl md:text-4xl font-extrabold text-white hover:text-yellow-200 transition duration-300 mb-8"
//             >
//                 Luxury Market
//             </Link>

//             {/* Profile Card */}
//             <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative transform hover:scale-105 transition-transform duration-300">

//                 {/* Profile Image */}
//                 <div className="relative w-36 h-36 mx-auto mb-4">
//                     <img
//                         src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
//                         alt={user.username}
//                         className="w-36 h-36 object-cover rounded-full border-4 border-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-lg"
//                     />
//                 </div>

//                 {/* User Info */}
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
//                     {user.username}
//                 </h2>
//                 <p className="text-gray-600 text-sm md:text-base mb-6">{user.email}</p>

//                 {/* Buttons */}
//                 <div className="flex flex-col sm:flex-row justify-center gap-4">
//                     <button
//                         onClick={handleLogout}
//                         className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 shadow-md"
//                     >
//                         Logout
//                     </button>

//                     <Link
//                         to="/productlist"
//                         className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300 shadow-md"
//                     >
//                         Product List
//                     </Link>

//                     <Link
//                         to="/createproduct"
//                         className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300 shadow-md"
//                     >
//                         Create Product
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;


// Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // 🔹 Fetch profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("You are not logged in.");
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axios.get(
                    import.meta.env.VITE_API_BASE_URL + "/auth/profile", // ✅ .env URL
                    config
                );

                if (data.success) {
                    // ProfilePic URL fix
                    if (data.user.profilePic && !data.user.profilePic.startsWith("http")) {
                        data.user.profilePic = `${import.meta.env.VITE_API_BASE_URL}${data.user.profilePic}`;
                    }

                    setUser(data.user);
                } else {
                    setError("Failed to fetch profile.");
                }
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // 🔹 Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
                <p className="text-xl md:text-2xl font-semibold text-white animate-pulse">
                    Loading...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-4">
                <p className="text-red-100 text-center font-bold text-lg md:text-xl">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 flex flex-col items-center justify-center px-4 py-10">
            {/* Header */}
            <Link
                to="/"
                className="text-3xl md:text-4xl font-extrabold text-white hover:text-yellow-200 transition duration-300 mb-8"
            >
                Luxury Market
            </Link>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative transform hover:scale-105 transition-transform duration-300">
                {/* Profile Image */}
                <div className="relative w-36 h-36 mx-auto mb-4">
                    <img
                        src={
                            user.profilePic ||
                            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                        }
                        alt={user.username}
                        className="w-36 h-36 object-cover rounded-full border-4 border-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-lg"
                    />
                </div>

                {/* User Info */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    {user.username}
                </h2>
                <p className="text-gray-600 text-sm md:text-base mb-6">{user.email}</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 shadow-md"
                    >
                        Logout
                    </button>

                    <Link
                        to="/productlist"
                        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition duration-300 shadow-md"
                    >
                        Product List
                    </Link>

                    <Link
                        to="/createproduct"
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition duration-300 shadow-md"
                    >
                        Create Product
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
