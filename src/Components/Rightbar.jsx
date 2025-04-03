/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Styles from "../constants/Styles";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { TbPasswordUser } from "react-icons/tb";
import { ImProfile } from "react-icons/im";


// import Styles from "../constants/Styles";

const Rightbar = ({ isOpen }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedOut(true);
    navigate("/login");
  };

  return (
    <div
      className={`fixed top-20 right-0 h-[calc(100vh-1rem)]  w-auto bg-black text-white transition-all transform ease-in-out duration-700 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-3">
        <nav>
          <ul className="space-y-4 mt-4 ">
            <li className="flex items-center hover:bg-cyan-500 cursor-pointer  justify-between gap-2 p-2 bg-gray-800 rounded-lg">
              <img
                className="w-12 h-12 rounded-full border-2  border-cyan-500"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5TaivUIIdSQht0uxky5eiVJIuUZorszOO0A&s"
                alt="Profile"
              />
              <span style={Styles.description} className="text-sm truncate">
                Furracho Lamborghini
              </span>
            </li>
            <li className="flex  items-center">
              <button 
              
                style={Styles.side}
                onClick={logOutHandler}
                className="p-2 w-full justify-start text-lg text-white cursor-pointer hover:bg-cyan-500 flex items-center gap-3 hover:rounded-lg"
              >
                <RiLogoutCircleRFill />

                Logout
              </button>
            </li>
            <li>
              <button
                style={Styles.side}
                className="p-2 w-full justify-start text-lg text-white cursor-pointer hover:bg-cyan-500 flex items-center gap-3 hover:rounded-lg"
              >
                <TbPasswordUser />

                Change Password
              </button>
            </li>
            <li>
              <button
                style={Styles.side}
                className="p-2 w-full justify-start text-lg text-white cursor-pointer hover:bg-cyan-500 flex items-center gap-3 hover:rounded-lg"
              >
                <ImProfile />

                Profile
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Rightbar;
