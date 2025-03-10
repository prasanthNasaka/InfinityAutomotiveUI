/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaFlagCheckered } from "react-icons/fa";
import { Ellipsis } from "lucide-react";
import Styles from "../constants/Styles";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedOut(true);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className="w-full h-20 flex justify-between items-center text-center bg-white shadow-lg">
      <div className="h- w-1/4 flex items-center phone:w-full iphone:w-full">
        <div className="w-full  h-full flex items-center p-2 phone:justify-between iphone:justify-between lappy:justify-start tab:justify-start desk:justify-start">
          <div className="flex items-center">
            <h1 className="text-3xl font-robotoMono font-bold text-cyan-500 flex gap-2">
              <span>
                <FaFlagCheckered className="text-3xl text-black" />
              </span>
              <span>Amon</span>
              <span className="text-3xl font-robotoMono font-bold text-black">
                Racing
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="h-full w-1/2 flex items-center phone:hidden  iphone:hidden"></div>

      <div className="h-full w-1/4 flex justify-center items-center">
        <div className="w-full h-full  flex justify-evenly items-center  p-1">
          <div className="w-1/2 h-full flex justify-end items-center gap-2">
            <span style={Styles.description}>Furracho Lamborghini</span>
            <img
              className="w-12 rounded-full  h-12 border-2 border-cyan-500"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TaivUIIdSQht0uxky5eiVJIuUZorszOO0A&s"
              alt=""
            />
          </div>
          <div className="tab:w-full  tab:h-full flex tab:justify-end tab:items-center">
            <Ellipsis
              className="size-8 cursor-pointer text-black hover:text-cyan-500   "
              onClick={toggleMenu}
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-14 right-0 w-28 tab:w-1/3  bg-white shadow-lg p-4 rounded-lg 
    flex flex-col items-center gap-6 transition-all duration-700 ease-in-out transform lappy:hidden
    ${isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
        >
          {/* Close Button */}
          <div className="w-full flex justify-end">
            <AiOutlineClose
              className="text-black cursor-pointer text-2xl"
              onClick={toggleMenu}
            />
          </div>

          {/* Profile Section */}
          <div className="flex flex-col items-center">
            <ul className="font-serif text-black text-lg cursor-pointer">
              <li className="w-full hover:text-cyan-600 text-center py-2">
                <a>Profile</a>
              </li>
            </ul>
          </div>

          {/* Logout Button */}
          <button
            onClick={logOutHandler}
            className="w-full text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Logout
          </button>
        </div>
      )}

      {/* {isMenuOpen && (
        <div
          className={`absolute top-0 tab:block right-0 h-fit w-20 tab:right-0 tab:w-1/3 tab:rounded-xl bg-white shadow-lg flex-col items-center gap-6 p-3 
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
                <a>Profile</a>
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
      )} */}
    </section>
  );
};

export default Header;
