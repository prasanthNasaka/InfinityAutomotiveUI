import { Link } from "react-router-dom";
import videoBg from "../assets/videoBg.mp4";
import Footer from "../Components/Footer";
import { useState } from "react";
import { BASE_URL } from "../constants/global-const";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your UserName.");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/api/Auth/forgotpassword`, {
        params: { username: email },
      });

      if (response.data.otpToken && response.data.otp) {
        localStorage.setItem("otpToken", response.data.otpToken);
        setOtpToken(response.data.otpToken);
        setGeneratedOtp(response.data.otp);
        setIsEmailDisabled(true);
        setIsOtpSent(true);
        toast.success("OTP sent successfully. Check your email.");
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!otp || !otpToken || !password) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("Otp", otp);
    formData.append("OtpToken", otpToken);
    formData.append("NewPassword", password);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/Auth/verify-otp`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Password changed successfully.");
        resetForm();
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.title || "Error changing password.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setEmail("");
    setOtp("");
    setPassword("");
    setOtpToken("");
    setGeneratedOtp("");
    setIsEmailDisabled(false);
    setIsOtpSent(false);
    localStorage.removeItem("otpToken");
  };

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
            <div className="flex items-center justify-center h-fit mx-auto w-full phone:w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white relative rounded-lg shadow-lg p-1 2xl:w-4/6">
              <div className="w-full p-6 md:mt-0 sm:max-w-md bg-white text-black dark:bg-white dark:text-black">
                <button className="flex items-center bg-cyan-500 text-white gap-3 p-2 border-none rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300">
                  <Link
                    to={"/login"}
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

                <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">
                      UserName
                    </label>
                    <input
                      type="email"
                      className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5"
                      placeholder="Enter your UserName/Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isEmailDisabled}
                    />
                    {!isOtpSent && (
                      <div className="flex justify-end mt-3">
                        <button
                          type="button"
                          className="px-5 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300"
                          onClick={handleSendOtp}
                        >
                          Send OTP
                        </button>
                      </div>
                    )}
                  </div>

                  {otpToken && (
                    <>
                      {generatedOtp && (
                        <p className="text-sm text-green-600">
                          Your OTP: <strong>{generatedOtp}</strong>
                        </p>
                      )}

                      <div>
                        <label className="block mb-2 text-sm font-medium text-black">
                          Enter OTP
                        </label>
                        <div className="flex justify-center gap-2 ">
                          {[...Array(6)].map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength="1"
                              className="w-14 h-12 text-center border border-gray-300 text-black text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
                              value={otp[index] || ""}
                              onChange={(e) => {
                                const newOtp = otp.split("");
                                newOtp[index] = e.target.value;
                                setOtp(newOtp.join(""));

                                if (e.target.value && index < 5) {
                                  document
                                    .getElementById(`otp-${index + 1}`)
                                    ?.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (
                                  e.key === "Backspace" &&
                                  !otp[index] &&
                                  index > 0
                                ) {
                                  document
                                    .getElementById(`otp-${index - 1}`)
                                    ?.focus();
                                }
                              }}
                              id={`otp-${index}`}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-black">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 pr-10"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
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
                                className="w-5 h-5"
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

                      <div>
                        <label className="block mb-2 text-sm font-medium text-black">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="bg-white border border-gray-300 text-black text-sm rounded-lg block w-full p-2.5 pr-10"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          >
                            {showConfirmPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
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
                                className="w-5 h-5"
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

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          onClick={handleChangePassword}
                          className="px-5 py-2 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition duration-300"
                        >
                          Change Password
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
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

export default ForgotPassword;
