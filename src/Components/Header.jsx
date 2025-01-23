import flag from "../assets/amon.png";
import photo from "../assets/flag.jpeg";
import { IoIosMenu } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedOut(true);
    window.location.href = "/";
    setIsLoggedOut();
    navigate("/login");
  };

  return (
    <section className="w-full h-full flex justify-between items-center shadow-md   text-center font-thin bg-white">
      <div className="h-full w-1/5 flex items-center phone:w-full iphone:w-full ">
        <div className="w-full h-full flex items-center  phone:justify-between iphone:justify-between lappy:justify-start  tab:justify-start  desk:justify-start ">
          <IoIosMenu className="w-16 h-9 cursor-pointer text-black hover:text-blue-500 hidden phone:block iphone:block tab:block " />

          <img
            className="h-16 w-60 iphone:w-28 object-fit phone:w-36 "
            src={flag}
            alt="Flag"
          />
        </div>
      </div>
      <div className="h-full w-1/5 flex items-center phone:hidden iphone:hidden "></div>

      <div className="h-full w-1/5 flex items-center px-2 phone:hidden iphone:hidden ">
        <div className="w-full h-full flex justify-around items-center">
          <span className="text-lg text-wrap text-gray-700 tab:text-lg font-bold hover:underline hover:decoration-blue-500 cursor-pointer">
            16-Dec-2024 17:02 (UTC+05:30)
          </span>
        </div>
      </div>

      <div className="h-full w-1/5 flex items-center phone:hidden iphone:hidden "></div>
      <div className="h-full w-1/5 flex justify-center items-center phone:hidden iphone:hidden">
        <div className="w-full h-full flex justify-around items-center gap-4  ">
          <div className="   flex items-center phone:hidden iphone:hidden tab:hidden lappy:w-36 desk:w-36 2xl:w-32 tab:w-26 ">
            <form className="relative w-full">
              <label className="sr-only" htmlFor="underline_select">
                Underline select
              </label>
              <div className="relative group flex justify-center items-center w-32     ">
                <select
                  id="underline_select"
                  className=" font-serif block py-2.5 px-4 w-full text-black bg-transparent appearance-none focus:outline-none focus:ring-0 text-xl cursor-pointer"
                >
                  <option selected>Login</option>
                  <option value="Register">Register</option>
                  <option value="Scrutiny">Scrutiny</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Accounts">Settings</option>
                </select>
                <FaAngleDown className="absolute right-2 pointer-events-none text-black " />

                <span className="absolute left-0 bottom-0 h-[4px] bg-blue-500 w-full origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={logOutHandler}
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 :ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                />
              </svg>
            </button>
          </div>

          <img
            className="h-full w-1/2 object-cover tab:w-full"
            src={photo}
            alt="Photo"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
