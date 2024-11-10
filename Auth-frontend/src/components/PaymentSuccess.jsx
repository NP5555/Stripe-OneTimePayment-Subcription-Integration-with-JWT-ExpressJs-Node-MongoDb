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

  export default PaymentSuccess;