import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

const Signup = () => {
  return (
    <section>
      <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://static.vecteezy.com/system/resources/previews/032/189/722/non_2x/3d-rendering-of-a-formula-1-race-car-on-the-track-ferrari-f1-on-the-track-sport-car-racing-formula-one-in-race-track-ai-generated-free-photo.jpg"
            alt="Moto Racing Background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 w-full max-w-md p-6 bg-black/80 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Sign Up for Amon Racing Updates
          </h1>
          <form className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                className="mt-1 w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                className="mt-1 w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                className="mt-1 w-full p-3 bg-gray-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <a className="text-red-500 hover:underline">
              <Link to={"/"}> Login</Link>
            </a>
          </p>
        </div>
      </div>
      <div className="w-full h-fit bg-red-600">
        <Footer />
      </div>
    </section>
  );
};

export default Signup;
