/* eslint-disable no-unused-vars */
import flag from "../assets/amon.png";
import { IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full h-full flex justify-between items-center shadow-md text-center font-thin bg-white p-4">
      <div className="flex w-full items-center justify-between">
        <img
          className="h-16 w-60 object-contain phone:w-36 iphone:w-28"
          src={flag}
          alt="Flag"
        />
        <Link to="/login">
          <button
            type="button"
            className="text-white bg-cyan-600 font-medium phone:hidden rounded-lg text-sm px-5 py-2.5"
          >
            Login
          </button>
        </Link>
      </div>
      <nav className="phone:flex iphone:flex flex items-center phone:w-full phone:justify-end ">
        <button onClick={toggleMenu} className="text-3xl hidden phone:block">
          <IoIosMenu />
        </button>
      </nav>

      {isMenuOpen && (
        <div
          className={`absolute top-0 tab:block right-0 h-fit w-1/2 tab:right-0 tab:w-1/5 tab:h-24 tab:rounded-xl bg-white shadow-lg flex-col items-center gap-6 p-6
          transition-all duration-1000 ease-in-out transform lappy:hidden ${
            isMenuOpen
              ? "translate-x-0 opacity-100 flex"
              : "translate-x-full opacity-0 hidden"
          }`}
        >
          <div className="flex justify-between">
            <div className="w-1/2">
            <AiOutlineClose
              className="text-black cursor-pointer self-end hover:text-cyan-600"
              onClick={toggleMenu}
            />
            </div>
            
            <Link to="/login">
              <button
                type="button"
                className="text-white bg-cyan-600 font-medium phone:block rounded-lg text-sm px-5 py-2.5"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
