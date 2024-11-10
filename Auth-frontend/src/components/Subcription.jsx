// Dashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Subcription = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("http://localhost:3000/stripe/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && Array.isArray(data.products)) {
          const planColors = {
            'Starter': 'bg-green-500',
            'Pro': 'bg-blue-500',
            'Premium': 'bg-purple-500',
            'Extreme': 'bg-red-500'
          };

          const planDescriptions = {
            'Starter': 'Perfect for individuals just beginning their journey. The Starter plan includes essential tools and basic features to help you get set up quickly. This plan is designed to provide everything you need to start utilizing our platform effectively and efficiently.',
            'Pro': 'Ideal for growing businesses that require more robust capabilities. The Pro plan offers advanced features designed to enhance productivity along with priority support. It empowers you to scale your operations confidently, tools to thrive in a competitive landscape.',
            'Premium': 'The Premium plan is tailored for enterprise-level needs, providing unlimited access to all features on our platform. With a dedicated account manager at your service, you receive personalized assistance and into  drive your business success to new heights.',
            'Extreme': 'The Extreme plan represents our ultimate package, designed for organizations needing the very best. Includes exclusive features, comprehensive custom solutions, and 24/7 support to ensure seamless operations demand excellence and continuous innovation in their services.'
          };

          const formattedProducts = data.products.map((product) => ({
            id: product.id,
            name: product.name,
            description: planDescriptions[product.name] || product.description || "",
            price: product.default_price.unit_amount / 100,
            priceId: product.default_price.id,
            features: [],
            interval: product.default_price.recurring?.interval || "one-time",
            headerColor: planColors[product.name] || 'bg-gray-500'
          }));
          setProducts(formattedProducts);
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token, navigate]);

  const handlePurchase = async (priceId, isSubscription) => {
    try {
      const endpoint = isSubscription 
        ? "http://localhost:3000/stripe/products/create-checkout-session"
        : "http://localhost:3000/stripe/products/create-one-time-checkout";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          priceId,
          ...(isSubscription && { mode: 'subscription' })
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const checkoutUrl = data.sessionUrl || data.url;
      if (!checkoutUrl) {
        console.error('Server response:', data);
        throw new Error('No checkout URL received from server');
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert(`Failed to start checkout: ${error.message}`);
    }
  };

  return (
<div className="min-h-screen bg-gray-100">
  <section className="py-8 h-full">
    <div className="container px-4 mx-auto max-w-7xl h-full">
      {isLoading ? (
        <div className="text-center">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : products.length === 0 ? (
        <div className="text-center">No products available</div>
      ) : (
        <div className="text-center mb-16">
          <h2 className="mb-4 text-5xl font-bold text-black">
            Pricing Plans
          </h2>
          <p className="mb-5 text-xl text-gray-600">
            Choose the perfect plan for your needs
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative flex flex-col bg-white border-2 border-gray-200 rounded-2xl shadow-lg hover:border-white hover:transform hover:scale-105 transition-all duration-300"
          >
            <div className={`${product.headerColor} p-6 rounded-t-2xl`}>
              <h3 className="text-2xl font-bold text-white">
                {product.name}
              </h3>
            </div>
            <div className="p-8 flex-grow">
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-black">${product.price}</span>
                <span className="text-gray-600 ml-2">
                  {product.interval === "month" ? "/month" : "one-time"}
                </span>
              </div>

              <ul className="mb-8 space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-black">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(product.priceId, product.interval === "month")}
                className="mt-auto py-4 px-8 bg-green-500 text-white rounded-xl font-bold hover:bg-green-700 transition-colors duration-300"
              >
                {product.interval === "month" ? "Subscribe Now" : "Purchase Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  <Footer />
</div>
  );
};

export default Subcription;
