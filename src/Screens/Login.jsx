const Login = () => {
  return (
    <section className="w-full h-screen">
      <div className="h-full flex w-full absolute">
        <div className="relative h- w-1/2">
          <img
            className="absolute inset-0 object-cover w-full h-full  brightness-75 -z-10"
            src="https://static.vecteezy.com/system/resources/previews/032/189/722/non_2x/3d-rendering-of-a-formula-1-race-car-on-the-track-ferrari-f1-on-the-track-sport-car-racing-formula-one-in-race-track-ai-generated-free-photo.jpg"
            alt="Moto Racing Background"
          />
        </div>

        <div className="w-1/2 h-full">
          <div className="h-full w-full flex items-center justify-center">
            <img
              className="object-cover w-1/2 h-full brightness-75 -z-10 scale-x-[-1] absolute"
              src="https://static.vecteezy.com/system/resources/previews/032/189/722/non_2x/3d-rendering-of-a-formula-1-race-car-on-the-track-ferrari-f1-on-the-track-sport-car-racing-formula-one-in-race-track-ai-generated-free-photo.jpg"
              alt="Moto Racing Background"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col  items-center justify-center w-full h-full">
        <h1 className="w-full h-20 relative p-8">
          <div className="flex justify-center items-center">
            <span className="text-l sm:text-2xl md:text-3xl lg:text-5xl font-bold uppercase text-white  relative">
              Moto Racing Club
            </span>
          </div>
          <div className="flex justify-end items-center p-2">
            <span className="text-l sm:text-2xl md:text-3xl lg:text-xl w-11/12 md:w-3/6 font-bold underline underline-offset-4 text-white opacity-70 sm:justify-end md:justify-end lg:justify-end">
              Get Ready To Race...
            </span>
          </div>
        </h1>
        <div className="flex items-center justify-center h-fit m-auto w-1/3 bg-black/40 relative shadow-lg rounded-lg p-4">
          <form className="w-full h-full flex flex-col gap-8 p-5">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm sm:text-base font-bold text-white uppercase"
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
                className="block mb-2 text-sm sm:text-base font-bold text-white uppercase"
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

            <div className="flex items-center mb-4">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-white border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm sm:text-base text-white uppercase"
              >
                Remember me
              </label>
            </div>

            <div className="flex justify-between items-center">
              <a
                href="#"
                className="text-sm sm:text-base underline text-white/80 hover:text-gray-200"
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
    </section>
  );
};

export default Login;
