import { Link } from "react-router-dom";
import videoBg from "../assets/videoBg.mp4";
import Footer from "../Components/Footer";

const Login = () => {
  return (
    <section className="w-full h-screen lappy:h-auto relative ">
      <div className="h-full flex flex-col lg:flex-row w-full">
        <div className="relative h-1/2 lg:h-full w-full lg:w-1/2">
          <video
            className="object-cover w-full h-full"
            src={videoBg}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          ></video>
        </div>

        <div className="absolute inset-0 flex justify-center lg:flex mt-5 w-full tab:text-4xl">
          <h1 className="sm:text-5xl md:text-6xl lg:text-6xl font-bold uppercase bg-gradient-to-l from-gray-800 to-white bg-clip-text text-transparent text-center desk:text-5xl phone:text-3xl">
            AMON Racing Club
            <div className="flex justify-end w-10/6 underline text-center tab:text-xs">
              <span className="sm:text-xs md:text-sm lg:text-l bg-gradient-to-l from-gray-800 to-white  bg-clip-text text-transparent">
                Every second counts..Every corner matters..
              </span>
            </div>
          </h1>
        </div>

        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-black/20 flex flex-col items-center justify-center  lappy:bg-black lappy:p-3">
          <div className="flex items-center justify-center h-fit mx-auto w-full phone:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white relative shadow-lg rounded-lg p-4 2xl:w-4/6">
            <form className="w-full flex flex-col gap-6 p-5">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs sm:text-sm md:text-base font-bold text-black uppercase"
                >
                  Your email <span className="text-red-500 text-sm">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 text-xs sm:text-sm md:text-base bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block mb-2 text-xs sm:text-sm md:text-base font-bold text-black uppercase"
                >
                  Your password <span className="text-red-500 text-sm">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 text-xs sm:text-sm md:text-base bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-blue-500 hover:cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-xs sm:text-sm md:text-base text-black uppercase hover:cursor-pointer"
                >
                  Remember me
                </label>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                <div className=" flex flex-col justify-center items-start w-full lappy:flex-row lappy:justify-between lappy:items-center">
                  <a
                    href="#"
                    className="text-xs sm:text-sm md:text-base underline text-black/80 hover:text-sky-900"
                  >
                    <Link to={"forgotpassword"}>Forgot password ?</Link>
                  </a>
                  <a className="text-xs sm:text-sm md:text-base underline text-black/80 hover:text-sky-900">
                    <Link to={"signup"}> Don&apos;t have an account ?</Link>
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm md:text-base bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300"
                >
                  <Link to={"dashboard"}>Login</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-fit bg-cyan-700/50">
        <Footer />
      </div>
    </section>
  );
};

export default Login;
