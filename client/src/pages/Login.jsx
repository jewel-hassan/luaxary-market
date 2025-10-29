// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [errorMsg, setErrorMsg] = useState("");
//     const [successMsg, setSuccessMsg] = useState("");

//     const navigate = useNavigate();

//     // Handle input change
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // Submit login
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setErrorMsg("");
//         setSuccessMsg("");

//         try {
//             const res = await axios.post("http://localhost:2000/auth/login", formData);

//             // Response data থেকে token এবং user বের করা
//             const { token, user, message } = res.data;

//             // localStorage এ save করা
//             localStorage.setItem("token", token);
//             localStorage.setItem("user", JSON.stringify(user));

//             setSuccessMsg(message);

//             // Login successful → redirect to profile বা home
//             navigate("/profile");
//         } catch (err) {
//             setErrorMsg(err.response?.data?.message || "Something went wrong");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-4">
//             <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
//                 <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

//                 {errorMsg && (
//                     <p className="text-red-500 text-center mb-4 font-medium">{errorMsg}</p>
//                 )}
//                 {successMsg && (
//                     <p className="text-green-500 text-center mb-4 font-medium">{successMsg}</p>
//                 )}

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* Email */}
//                     <div>
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
//                             required
//                         />
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
//                             required
//                         />
//                     </div>

//                     {/* Submit */}
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition duration-300"
//                     >
//                         {loading ? "Logging in..." : "Login"}
//                     </button>
//                 </form>

//                 <p className="text-center mt-6 text-gray-500">
//                     Don't have an account?{" "}
//                     <Link to="/register" className="text-purple-500 font-semibold hover:underline">
//                         Register
//                     </Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    // 🔹 Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Submit login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const res = await axios.post(
                import.meta.env.VITE_API_BASE_URL + "/auth/login", // ✅ Env variable
                formData
            );

            // Response data থেকে token এবং user বের করা
            const { token, user, message } = res.data;

            // localStorage এ save করা
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setSuccessMsg(message);

            // Login successful → redirect to profile
            navigate("/profile");
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-4">
            <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Login</h2>

                {errorMsg && (
                    <p className="text-red-500 text-center mb-4 font-medium">{errorMsg}</p>
                )}
                {successMsg && (
                    <p className="text-green-500 text-center mb-4 font-medium">{successMsg}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-xl transition duration-300"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-500 font-semibold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

