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
  
  export default PaymentCancel;