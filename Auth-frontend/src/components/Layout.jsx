import React from "react";
import img from "../assets/previews/pricingplans.png"
import logo from "../assets/previews/logobesecure.png"
// import LandingPage from "./LandingPage";


function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={logo}
              alt="bSecure Logo"
              className="h-10 w-10"
            />
            <h1 className="text-2xl font-bold text-green-700">bSecure</h1>
          </div>

          <nav>
            {/* <ul className="flex space-x-6">
              {["Demo", "Features", "Payments", "Builders", "Developers"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-700 rounded-xl hover:text-green-700 transition duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul> */}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">
            Universal Checkout For Pakistan
          </h2>
          <p className="text-gray-600 text-lg">
            One-Click checkout solution for your business with a strong focus on
            security and unifying major payment methods.
          </p>
          <button url="/register" className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition">
            Sign Up Now
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="bg-gray-100 rounded-t-xl p-4">
            <div className="flex justify-between items-center mb-4">
             
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col space-y-4">
          <a
            href="/register"
            className="inline-block text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-lg px-6 py-3 transition-colors duration-300"
          >
            Register
          </a>
          <a
            href="/login"
            className="inline-block text-green-700 bg-white border border-green-500 hover:bg-blue-600 hover:text-white focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-lg px-6 py-3 transition-colors duration-300"
          >
            Already have an account?
          </a>
        </div>
      </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Layout;
