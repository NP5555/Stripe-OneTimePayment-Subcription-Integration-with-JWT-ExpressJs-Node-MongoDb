// Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:3000/auth/register", formData);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Register an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-lg text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Register
          </button>

          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-green-600 hover:underline dark:text-green-500"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
