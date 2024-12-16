import { Link } from "react-router-dom";

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
      <div className="w-full sphone:w-full h-auto bg-red-600 p-4 flex flex-wrap  items-center gap-3">
        <p className="text-base iphone:text-lg tab:text-xl lappy:text-xl text-black font-bold mb-4  2xl:text-2xl flex   ">
          Type Of Users:
        </p>
        <div className="w-full h-full flex flex-col md:flex-row ">
          <div className="w-full h-auto px-4 flex-1   text-black ">
            <ul className="space-y-2  list-inside  text-base tab:text-lg 2xl:text-xl  iphone:text-sm desk:text-xl px-3   lappy:text-lg ">
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Register
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                TimeKeeper
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Admin
              </li>
              <li className=" w-fit hover:cursor-pointer hover:underline hover:text-white">
                Scrutiny
              </li>
            </ul>
          </div>

          <div className="w-full h-auto px-4 flex-1  text-black">
            <ul className="space-y-2  list-inside text-base tab:text-lg 2xl:text-xl  iphone:text-sm px-3  desk:text-xl   lappy:text-lg ">
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Login to register the participants
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                One who handles the race
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Login to add a new race
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Access to all above features
              </li>
            </ul>
          </div>

          <div className="w-full h-auto px-4 flex-1  text-black">
            <ul className="space-y-2  list-inside text-base tab:text-lg  2xl:text-xl  iphone:text-sm px-3 desk:text-xl  lappy:text-lg ">
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Registration screen
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                TimeKeeper screen and big display
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Manage data entry screen
              </li>
              <li className="w-fit hover:cursor-pointer hover:underline hover:text-white">
                Event Owner
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-5 border-t-2 border-black w-full" />
        <div className="flex w-full h-fit items-center justify-center gap-5 mt-base iphone:mt-0 tab:mt-3 lappy:mt-2 ">
          <div className="flex justify-center w-fit h-auto p-3 text-base iphone:text-md tab:text-lg lappy:text-xl">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
            </svg>
          </div>
          <div className="flex justify-center w-fit p-3 text-base iphone:text-md tab:text-lg lappy:text-xl">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
            </svg>
          </div>
          <div className="flex justify-center w-fit p-3 text-base iphone:text-md tab:text-lg lappy:text-xl">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
            </svg>
          </div>
          <div className="flex justify-center w-fit p-3 text-base iphone:text-md tab:text-lg lappy:text-xl">
            <svg
              className="cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="currentColor"
            >
              <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
