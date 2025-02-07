import { Link } from "react-router-dom";
import videoBg from "../assets/videoBg.mp4";
import Footer from "../Components/Footer";

const Forgotpassword = () => {
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
          <div className="flex items-center justify-center h-fit mx-auto w-full phone:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white relative rounded-lg shadow-lg p-1 2xl:w-4/6">
            <div className="w-full p-6 md:mt-0 sm:max-w-md bg-white text-black dark:bg-white dark:text-black">
              <button className="flex items-center text-gray-600 hover:text-cyan-600 mb-5 gap-2 transition-colors">
                <Link
                  to={"/"}
                  className="flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  <span> Back to login</span>
                </Link>
              </button>

              <h3 className="text-xl font-semibold text-black mb-2 dark:text-black">
                Reset your password
              </h3>
              {/* <p className="text-gray-600 mb-6 dark:text-black">
                Enter your email and we&apos;ll send you instructions to reset
                your password.
              </p> */}

              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:text-black"
                    placeholder="Enter your email"
                    required=""
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                  >
                    Enter OTP
                  </label>
                  <input
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:text-black"
                    placeholder="Enter your OTP"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 top-7 flex items-center text-gray-500 "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="black"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                  >
                    Password
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:text-black"
                    placeholder="Enter your password"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black dark:text-black"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:text-black"
                    placeholder="Enter New Password"
                    required=""
                  />
                </div>

                <div className="flex justify-end items-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm md:text-base bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300"
                  >
                    Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit bg-cyan-700/50">
        <Footer />
      </div>
    </section>
  );
};

export default Forgotpassword;
