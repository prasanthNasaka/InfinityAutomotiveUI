/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Styles from "../constants/Styles";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { TbPasswordUser } from "react-icons/tb";
import { IMAGE_URL } from "../constants/global-const";

const Rightbar = ({ isOpen }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [userName, setUserName] = useState("");
  const [logo, setLogo] = useState("");

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    setIsLoggedOut(true);
    navigate("/login");
  };

  const handleClick = () => {
    navigate("/ChangePassword");
  };

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    const storedLogo = localStorage.getItem("companylogo");
    if (storedName) setUserName(storedName);
    if (storedLogo) {
      setLogo(`${IMAGE_URL}${storedLogo}`);
    }
  }, []);

  return (
    <div
      className={`z-50 fixed top-20 right-0 h-[calc(100vh-1rem)]  w-auto bg-black text-white transition-all transform ease-in-out duration-700 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-3">
        <nav className="relative">
          <ul className="space-y-4 mt-4 ">
            <li className="flex items-center hover:bg-cyan-500 cursor-pointer  justify-between gap-2 p-2 bg-gray-800 rounded-lg">
              <img
                className="w-12 h-12 rounded-full border-2 border-cyan-500 object-fill"
                src={logo || "https://via.placeholder.com/48x48.png?text=Logo"}
                alt="Company Logo"
              />
              <span style={Styles.description}>{userName}</span>
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
                onClick={handleClick}
              >
                <TbPasswordUser />
                Change Password
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Rightbar;
