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
          <div className="absolute inset-0 flex  justify-center  lg:flex mt-5 w-full tab:text-4xl">
            <h1 className=" sm:text-5xl md:text-6xl lg:text-6xl font-bold uppercase text-white/80 text-center  desk:text-5xl phone:text-3xl">
              AMON Racing Club
              <div className="flex  justify-end w-10/6 underline text-center tab:text-xs ">
                <span className=" text-white/60 sm:text-xs md:text-sm lg:text-l ">
                  Every second counts..Every corner matters..
                </span>
              </div>
            </h1>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-black/20 flex flex-col items-center justify-center  lappy:bg-black lappy:p-3">
          <div className="flex items-center justify-center h-fit mx-auto w-full phone:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white relative rounded-lg shadow-lg p-4 2xl:w-4/6">
            <div className="w-full p-6  md:mt-0 sm:max-w-md dark:bg-gray-800">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Change Password
              </h2>
              <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    required=""
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="newsletter"
                      aria-describedby="newsletter"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="newsletter"
                      className="font-light text-gray-500 dark:text-gray-300 hover:cursor-pointer"
                    >
                      I accept the{" "}
                      <a className="font-medium text-blue-600 hover:underline hover:cursor-pointer dark:text-primary-500 ">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm md:text-base font-bold text-white bg-gradient-to-r from-sky-800 via-sky-300 to-sky-600 hover:bg-gradient-to-br rounded focus:ring-4 focus:ring-sky-300"
                >
                  Reset passwod
                </button>
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
