// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Navbar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [user, setUser] = useState(null);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const navigate = useNavigate();
//     const dropdownRef = useRef();

//     // Fetch user from localStorage
//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const userData = localStorage.getItem("user");
//         if (token && userData) {
//             const parsedUser = JSON.parse(userData);

//             // Ensure profilePic has full URL
//             if (parsedUser.profilePic && !parsedUser.profilePic.startsWith("http")) {
//                 parsedUser.profilePic = `http://localhost:2000${parsedUser.profilePic}`;
//             }

//             setUser(parsedUser);
//         }
//     }, []);

//     // Close dropdown on outside click
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     // Logout user
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         setUser(null);
//         navigate("/login");
//     };

//     return (
//         <nav className="bg-white/90 backdrop-blur-md shadow-md fixed w-full z-50 border-b border-purple-100">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex justify-between h-16 items-center">
//                     {/* Logo */}
//                     <Link
//                         to="/"
//                         className="text-2xl md:text-3xl font-extrabold text-purple-700 hover:text-purple-900 transition duration-300"
//                     >
//                         Luaxary Market
//                     </Link>

//                     {/* Desktop Menu */}
//                     <div className="hidden md:flex items-center space-x-5">
//                         {!user && (
//                             <>
//                                 <Link
//                                     to="/login"
//                                     className="px-5 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 shadow-sm"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-sm"
//                                 >
//                                     Signup
//                                 </Link>
//                             </>
//                         )}

//                         {user && (
//                             <div className="flex items-center gap-5" ref={dropdownRef}>
//                                 <Link
//                                     to="/createproduct"
//                                     className="px-4 py-2 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
//                                 >
//                                     Create Product
//                                 </Link>
//                                 <Link
//                                     to="/productlist"
//                                     className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
//                                 >
//                                     Product List
//                                 </Link>

//                                 {/* Profile Dropdown */}
//                                 <div className="relative">
//                                     <img
//                                         src={
//                                             user.profilePic ||
//                                             "https://cdn-icons-png.flaticon.com/512/847/847969.png"
//                                         }
//                                         alt={user.username}
//                                         className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover cursor-pointer hover:scale-105 transition-transform"
//                                         onClick={() => setDropdownOpen(!dropdownOpen)}
//                                     />
//                                     {dropdownOpen && (
//                                         <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 ring-1 ring-gray-100 z-50">
//                                             <Link
//                                                 to="/profile"
//                                                 className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition duration-200 rounded-t-xl"
//                                             >
//                                                 Profile
//                                             </Link>
//                                             <button
//                                                 onClick={handleLogout}
//                                                 className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-200 rounded-b-xl"
//                                             >
//                                                 Logout
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Mobile Menu Button */}
//                     <button
//                         onClick={() => setIsOpen(!isOpen)}
//                         className="md:hidden text-gray-700 hover:text-purple-600 focus:outline-none"
//                     >
//                         {isOpen ? (
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={2}
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         ) : (
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 strokeWidth={2}
//                                 stroke="currentColor"
//                                 className="w-6 h-6"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//                             </svg>
//                         )}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile Dropdown Menu */}
//             {isOpen && (
//                 <div className="md:hidden bg-white shadow-lg border-t border-purple-100">
//                     <div className="px-4 py-3 space-y-2">
//                         {!user && (
//                             <>
//                                 <Link
//                                     to="/login"
//                                     className="block px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link
//                                     to="/register"
//                                     className="block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
//                                 >
//                                     Signup
//                                 </Link>
//                             </>
//                         )}
//                         {user && (
//                             <>
//                                 <Link
//                                     to="/createproduct"
//                                     className="block px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
//                                 >
//                                     Create Product
//                                 </Link>
//                                 <Link
//                                     to="/productlist"
//                                     className="block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
//                                 >
//                                     Product List
//                                 </Link>
//                                 <Link
//                                     to="/profile"
//                                     className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition duration-200 rounded-lg"
//                                 >
//                                     Profile
//                                 </Link>
//                                 <button
//                                     onClick={handleLogout}
//                                     className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 transition duration-200 rounded-lg"
//                                 >
//                                     Logout
//                                 </button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;




import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef();

    // Backend base URL from .env
    const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Vite-এর জন্য .env variable

    // Fetch user from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        if (token && userData) {
            const parsedUser = JSON.parse(userData);

            // Ensure profilePic has full URL
            if (parsedUser.profilePic && !parsedUser.profilePic.startsWith("http")) {
                parsedUser.profilePic = `${BASE_URL}${parsedUser.profilePic}`;
            }

            setUser(parsedUser);
        }
    }, [BASE_URL]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Logout user
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-md fixed w-full z-50 border-b border-purple-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl md:text-3xl font-extrabold text-purple-700 hover:text-purple-900 transition duration-300"
                    >
                        Luaxary Market
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-5">
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300 shadow-sm"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300 shadow-sm"
                                >
                                    Signup
                                </Link>
                            </>
                        )}

                        {user && (
                            <div className="flex items-center gap-5" ref={dropdownRef}>
                                <Link
                                    to="/createproduct"
                                    className="px-4 py-2 text-purple-700 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
                                >
                                    Create Product
                                </Link>
                                <Link
                                    to="/productlist"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                >
                                    Product List
                                </Link>

                                {/* Profile Dropdown */}
                                <div className="relative">
                                    <img
                                        src={
                                            user.profilePic ||
                                            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                                        }
                                        alt={user.username}
                                        className="w-10 h-10 rounded-full border-2 border-purple-500 object-cover cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                    />
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl py-2 ring-1 ring-gray-100 z-50">
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition duration-200 rounded-t-xl"
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-200 rounded-b-xl"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700 hover:text-purple-600 focus:outline-none"
                    >
                        {isOpen ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-purple-100">
                    <div className="px-4 py-3 space-y-2">
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                >
                                    Signup
                                </Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Link
                                    to="/createproduct"
                                    className="block px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition duration-300"
                                >
                                    Create Product
                                </Link>
                                <Link
                                    to="/productlist"
                                    className="block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
                                >
                                    Product List
                                </Link>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition duration-200 rounded-lg"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-100 hover:text-red-600 transition duration-200 rounded-lg"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

