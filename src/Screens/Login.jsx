/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import videoBg from "../assets/videoBg.mp4";
import Footer from "../Components/Footer";
import { BASE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("username", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    setError(null);
    try {
      const response = await axios.post(`${BASE_URL}/api/Auth/login`, {
        username: email,
        password,
      });

      if (response.status === 200) {
        toast.success("Login successful! Redirecting...");

        const { jwtToken, roleID, companylogo } = response.data.data;

        localStorage.setItem("authToken", jwtToken);
        localStorage.setItem("userRole", roleID);
        localStorage.setItem("companylogo", companylogo);

        const roleRoutes = {
          100: "/addcompany",
          101: "/dashboard",
          102: "/dashboard",
          103: "/registration",
          104: "/driverracelink",
          default: "/scrutiny",
        };

        setTimeout(() => {
          navigate(roleRoutes[roleID] || roleRoutes.default);
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      if (error.response) {
        const errorMsg =
          error.response.status === 400
            ? "Invalid credentials. Please try again."
            : error.response.data.message ||
              "Please enter a valid username or password";
        toast.error(errorMsg);
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Unexpected error. Please try again later.");
      }
    }
  };

  const storedCredentials = () => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (storedUsername && storedPassword) {
      setEmail(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    storedCredentials();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <section className="w-full h-screen lappy:h-auto relative">
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
                <span className="sm:text-xs md:text-sm lg:text-l bg-gradient-to-l from-gray-800 to-white bg-clip-text text-transparent">
                  Every second counts..Every corner matters..
                </span>
              </div>
            </h1>
          </div>

          <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-black/20 flex flex-col items-center justify-center lappy:bg-black lappy:p-3">
            <div className="flex items-center justify-center h-fit mx-auto w-full phone:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white relative shadow-lg rounded-lg p-4 2xl:w-4/6">
              <form
                className="w-full flex flex-col gap-6 p-5"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xs sm:text-sm md:text-base font-bold text-black uppercase"
                  >
                    Username <span className="text-red-500 text-sm">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 text-xs sm:text-sm md:text-base bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xs sm:text-sm md:text-base font-bold text-black uppercase"
                  >
                    Your password{" "}
                    <span className="text-red-500 text-sm">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-2 text-xs sm:text-sm md:text-base bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div className="flex items-center mb-4">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-blue-500 hover:cursor-pointer accent-cyan-600"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-xs sm:text-sm md:text-base text-black uppercase hover:cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                  <div className="flex flex-col justify-center items-start w-full lappy:flex-row lappy:justify-between lappy:items-center">
                    <Link
                      to={"/forgotpassword"}
                      className="text-xs sm:text-sm md:text-base underline text-black/80 hover:text-sky-900"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm md:text-base bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-full h-fit bg-cyan-700/60">
          <Footer />
        </div>
      </section>
    </>
  );
};

export default Login;
