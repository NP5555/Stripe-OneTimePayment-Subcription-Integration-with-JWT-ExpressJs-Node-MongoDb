// App.js
import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Subcription from "./components/Subcription";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

// Add these new components
const PaymentSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for your subscription. We appreciate your support!
        </p>
        <a
          href="/Subcription"
          className="inline-block text-white bg-green-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-xl text-sm px-5 py-2.5 transition-colors duration-300"
        >
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

const PaymentCancel = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-gray-700 mb-6">
          Your payment was cancelled. Please try again.
        </p>
        <a
          href="/Subcription"
          className="inline-block text-white bg-green-600 hover:bg-green-900 focus:ring-4 focus:ring-blue-200 font-medium rounded-xl text-lg px-6 py-3 transition-colors duration-300"
        >
          Return to Subscription
        </a>
      </div>
    </div>
  );
};

// Add this new component
const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-gray-500 mb-8">
        Welcome its a   <br></br>Stripe Checkout Application
      </h1>
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
  );
};

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/subcription"
            element={
              <ProtectedRoute>
                <Subcription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cancel"
            element={
              <ProtectedRoute>
                <PaymentCancel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
