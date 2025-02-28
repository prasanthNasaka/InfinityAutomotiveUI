import flag from "../assets/amon.png";
import { IoIosMenu } from "react-icons/io";
// import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedOut(true);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="w-full h-full flex justify-between items-center shadow-md text-center font-thin bg-white">
      <div className="h-full w-1/5 flex items-center phone:w-full iphone:w-full ">
        <div className="w-full h-full flex items-center phone:justify-between iphone:justify-between lappy:justify-start tab:justify-start desk:justify-start">
          <img
            className="h-16 w-60 iphone:w-28 object-fit phone:w-36"
            src={flag}
            alt="Flag"
          />
        </div>
      </div>

      <div className="h-full w-1/5 flex items-center phone:hidden iphone:hidden">
        <div className="w-full h-full flex justify-around items-center flex-col tab:whitespace-nowrap ">
          <span className="text-lg text-wrap text-gray-700 tab:text-lg font-bold hover:underline hover:decoration-blue-500 cursor-pointer">
            Date: {currentTime.toLocaleDateString()}
          </span>
          <span className="text-lg text-wrap text-gray-700 tab:text-lg font-bold hover:underline hover:decoration-blue-500 cursor-pointer">
            Time: {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="h-full w-1/5 flex justify-center items-center">
        <div className="w-full h-full flex justify-end items-center  p-1 ">
          

          <div className="2xl:w-1/2  tab:hidden h-full flex 2xl:justify-end 2xl:items-center">
            <button
              onClick={logOutHandler}
              type="button"
              className=" text-white font-bold bg-red-700 hover:bg-red-800 border rounded-md text-sm p-2 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 "
            >
              
              Logout
            </button>
          </div>

          <div className="tab:w-full  tab:h-full flex tab:justify-end tab:items-center">
            <IoIosMenu
              className="size-8 cursor-pointer text-black hover:text-blue-500  2xl:hidden tab:block "
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-0 tab:block right-0 h-fit w-1/5 tab:right-0 tab:w-1/3 tab:rounded-xl bg-white shadow-lg flex-col items-center gap-6 p-3 
          transition-all duration-1000 ease-in-out transform lappy:hidden ${
            isMenuOpen
              ? "translate-x-0 opacity-100 flex"
              : "translate-x-full opacity-0 hidden"
          }`}
        >
          <div className="flex justify-end">
            <AiOutlineClose
              className="text-black cursor-pointer self-end"
              onClick={toggleMenu}
            />
          </div>
          <div className="flex justify-center items-center">
            <ul
              id="underline_select"
              className="font-serif tab:flex tab:flex-col tab:gap-4 tab:w-fit lappy:block py-2.5 px-4  text-black bg-transparent flex justify-start text-xl cursor-pointer"
            >
              <li className="w-full h-auto hover:text-cyan-600 flex justify-start">
                <a>Login</a>
              </li>
              <li className="w-full h-auto hover:text-cyan-600 flex justify-start">
                <a>Register</a>
              </li>
              <li className="w-full h-auto hover:text-cyan-600 flex justify-start">
                <a>Scrutiny</a>
              </li>
              <li className="w-full h-auto hover:text-cyan-600 flex justify-start">
                <a>Accounts</a>
              </li>
            </ul>
          </div>
          <button
            onClick={logOutHandler}
            type="button"
            className="w-fit text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Logout
          </button>
        </div>
      )}
    </section>
  );
};

export default Header;
