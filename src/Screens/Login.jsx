const Login = () => {
  return (
    <section className="w-full h-screen">
      <div className="h-full flex w-full ">
        <div className=" h-full w-1/2 justify-center flex items-center ">
          <img
            className="object-cover w-full h-full  brightness-75"
            src="https://static.vecteezy.com/system/resources/previews/032/189/722/non_2x/3d-rendering-of-a-formula-1-race-car-on-the-track-ferrari-f1-on-the-track-sport-car-racing-formula-one-in-race-track-ai-generated-free-photo.jpg"
            alt="Moto Racing Background"
          />
        </div>

        <div className="w-1/2 h-full bg-black/20 ">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-col w-2/3  mt-5">
              <div className="flex justify-center items-center w-full">
                <span className="text-l sm:text-2xl md:text-3xl lg:text-5xl font-bold uppercase text-black">
                  AMON Racing Club
                </span>
              </div>
              <div className="flex w-full justify-end">
                <span className="text-l sm:text-2xl md:text-3xl lg:text-xl w-fit md:w-fit font-bold underline underline-offset-4 text-black opacity-70 sm:justify-center md:justify-center lg:justify-center">
                  Born To Race...
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center h-fit m-auto w-2/3 bg-white relative shadow-lg rounded-lg p-4">
              <form className="w-full h-full flex flex-col gap-8 p-5">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm sm:text-base font-bold text-black uppercase"
                  >
                    Your email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2.5 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm sm:text-base font-bold text-black uppercase"
                  >
                    Your password*
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-2.5 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center mb-4 ">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-blue-500 hover:cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm sm:text-base text-black uppercase hover:cursor-pointer "
                  >
                    Remember me
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href="#"
                    className="text-sm sm:text-base underline text-black/80 hover:text-red-900 "
                  >
                    Forgotten password?
                  </a>
                  <button
                    type="submit"
                    className="px-5 py-2.5 sm:text-base font-bold text-white bg-gradient-to-r from-red-800 via-black to-red-600 hover:bg-gradient-to-br rounded focus:ring-4 focus:ring-green-300"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
