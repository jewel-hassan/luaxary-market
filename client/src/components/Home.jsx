import React from "react";
import Navbar from "./Navbar";


const Home = () => {
    return (
        <div className="relative">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Our Exclusive Jewelry Collection
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mb-8">
                    Discover the finest handcrafted jewelry designed to make you shine.
                    Elegant, unique, and perfect for every occasion.
                </p>

            </section>


        </div>
    );
};

export default Home;

