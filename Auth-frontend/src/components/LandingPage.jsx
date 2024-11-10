// import Layout from "./Layout";
import img from "../assets/previews/pricingplans.png"
import logo from "../assets/previews/logobesecure.png"

const LandingPage = () => {
    return (
        <div className="relative h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={img}
            alt="Background"
            className="w-full h-full object-cover opacity-15"
          />
          {/* Optional color overlay */}
          <div className="absolute inset-0 bg-green-900/10"></div>
        </div>

        <header className="relative z-10 bg-white shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src={logo}
                alt="bSecure Logo"
                className="h-12 w-12 transition-transform hover:scale-105"
              />
              <h1 className="text-3xl font-bold text-green-700">bSecure</h1>
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
  
        <main className="relative z-10 flex-1 container mx-auto px-6 py-12 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Universal Stripe Checkout <span className="text-green-700">For AlL Over the World</span>
            </h2>
            <p className="text-gray-600 text-xl leading-relaxed">
              One-Click checkout solution for your business with a strong focus on
              security and unifying major payment methods.
            </p>
            <a 
              href="/register"
              className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign Up Now
            </a>
          </div>
  
          <div className="bg-white shadow-2xl rounded-2xl p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
              <a
                href="/register"
                className="w-full text-center text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-semibold rounded-lg text-lg px-8 py-4 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Register Now
              </a>
              <a
                href="/login"
                className="w-full text-center text-green-700 bg-white border-2 border-green-500 hover:bg-green-50 focus:ring-4 focus:ring-green-200 font-semibold rounded-lg text-lg px-8 py-4 transition-all duration-300"
              >
                Already have an account?
              </a>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default LandingPage;