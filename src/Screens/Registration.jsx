import { useNavigate } from "react-router-dom";
import videoBg from "../assets/videoBg.mp4";
import axios from "axios";
import { useState, useEffect } from "react";

const Registration = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://c4pfntkn-5105.inc1.devtunnels.ms/api/Auth/register",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        setMessage("User registered successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(response.data || "Something went wrong");
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 &&
          error.response.data === "User already exists"
        ) {
          setMessage("User already exists");
        } else {
          setMessage(error.response.data || "An error occurred");
        }
      } else {
        setMessage("Network error, please try again");
      }
    }
  };

  return (
    <section className="w-full h-screen relative">
      <div className="absolute top-4 w-full text-center z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase">
          Registration for AMON Racing Club
        </h1>
      </div>

      <div className="absolute inset-0">
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

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6">
          <form className="flex flex-col gap-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-bold text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-3 mt-1 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                minLength="4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-1 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                minLength="8"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center p-2">
              <input
                id="link-checkbox"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <label
                htmlFor="link-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                >
                  terms and conditions
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-bold text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 transition duration-300"
            >
              Register
            </button>
            <div className="flex justify-center items-center">
              {" "}
              <p>
                Already have an account{" "}
                <a href="/login" className="text-blue-600 cursor-pointer">
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      {message && isVisible && (
        <div className="mt-4 text-center text-sm font-bold h-60 w-full text-gray-300 animate-pulse absolute bottom-0 flex justify-center items-center">
          <div className="w-fit py-3 px-12 bg-gray-800 rounded-lg">
            <span className="text-2xl">{message}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
