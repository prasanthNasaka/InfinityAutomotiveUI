import { Link } from "react-router-dom";
import Header from "../Components/Header";
import myImg from "../assets/Sport.png";

const Signup = () => {
  return (
    <section className="w-full h-screen ">
      <div className=" z-10  w-full text-white fixed ">
        <Header />
      </div>
      <div className=" w-full h-full flex flex-col 2xl:flex-row  lappy:flex-col lappy:h-fit tab:h-full  lappy:bg-gradient-to-t to-gray-100 from-black absolute inset-0  phone:h-full iphone:h-fit ">
        <div className="w-1/2 desk:w-full lappy:h-full  desk:h-full ">
          <div className="  h-screen lappy:h-full desk:h-full tab:h-full phone:h-full iphone:h-full">
            <img
              src={myImg}
              alt="Moto Racing Background"
              className="w-full h-full object-cover brightness-75"
            />
          </div>
        </div>
        <div className=" w-1/2 flex justify-center flex-col  h-full items-center bg-black/20 desk:p-3 desk:w-full   ">
          <div className="  w-full max-w-md p-6  rounded-lg shadow-lg bg-white  ">
            <h1 className="text-3xl font-bold text-black text-center mb-6 ">
              Create an account{" "}
            </h1>
            <form className="flex flex-col space-y-4  ">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-black"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                    className="mt-1 w-full p-3  text-black rounded-lg outline-none focus:ring-2 focus:ring-blue-500 border"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-black"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                    className="mt-1 w-full p-3  text-black rounded-lg outline-none focus:ring-2 focus:ring-blue-500 border"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full p-3  text-black rounded-lg outline-none focus:ring-2 focus:ring-blue-500 border"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className="mt-1 w-full p-3 border text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="mt-1 w-full p-3 border text-white rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300"
              >
                Create
              </button>
            </form>

            <p className="mt-6 text-sm text-black text-center">
              Already have an account?{" "}
              <a className="text-cyan-500 hover:underline">
                <Link to={"/"}> Login</Link>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
