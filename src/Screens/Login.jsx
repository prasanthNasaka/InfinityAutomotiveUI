import videoBg from "../assets/videoBg.mp4";

const Login = () => {
  return (
    <section className="w-full h-screen relative">
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

        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-black/20 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center h-fit mx-auto w-full phone:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white relative shadow-lg rounded-lg p-4">
            <form className="w-full flex flex-col gap-6 p-5">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-xs sm:text-sm md:text-base font-bold text-black uppercase"
                >
                  Your email*
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
                  Your password*
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
                <a
                  href="#"
                  className="text-xs sm:text-sm md:text-base underline text-black/80 hover:text-sky-900"
                >
                  Forgotten password?
                </a>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm md:text-base font-bold text-white bg-gradient-to-r from-sky-800 via-sky-300 to-sky-600 hover:bg-gradient-to-br rounded focus:ring-4 focus:ring-sky-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
