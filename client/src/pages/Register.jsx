import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle profile picture file
    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const data = new FormData();
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (profilePic) data.append("profilePic", profilePic);

            const res = await axios.post("http://localhost:2000/auth/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccessMsg(res.data.message);
            setFormData({ username: "", email: "", password: "" });
            setProfilePic(null);
        } catch (err) {
            setErrorMsg(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
            <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Create Account</h2>

                {errorMsg && (
                    <p className="text-red-500 text-center mb-4 font-medium">{errorMsg}</p>
                )}
                {successMsg && (
                    <p className="text-green-500 text-center mb-4 font-medium">{successMsg}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center">
                        <label
                            htmlFor="profilePic"
                            className="w-24 h-24 rounded-full border-2 border-dashed border-purple-500 flex items-center justify-center cursor-pointer overflow-hidden"
                        >
                            {profilePic ? (
                                <img
                                    src={URL.createObjectURL(profilePic)}
                                    alt="Profile Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-purple-500 font-semibold">Upload</span>
                            )}
                        </label>
                        <input
                            type="file"
                            id="profilePic"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                            required
                        />
                    </div>

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
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-500">
                    Already have an account?{" "}


                    <Link to="/login" className="text-purple-500 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
