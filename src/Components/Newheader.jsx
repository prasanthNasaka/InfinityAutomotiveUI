/* eslint-disable no-unused-vars */

import { FaBars, FaFlagCheckered, FaTimes } from "react-icons/fa";
import Styles from "../constants/Styles";
import Rightbar from "./Rightbar";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "../constants/global-const";


const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [logo, setLogo] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      <Rightbar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="h-full w-1/2 flex items-center phone:hidden  iphone:hidden"></div>

      <div className="h-full w-1/4 flex justify-center items-center">
        <div className="w-full h-full  flex justify-evenly items-center  p-1">
          <div className="w-1/2 h-full flex justify-end items-center gap-3">
            <span style={Styles.description}>{userName}</span>
            <img
              className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
              src={logo || "https://via.placeholder.com/48x48.png?text=Logo"}
              alt="Company Logo"
            />
          </div>

          <div className="tab:w-full  tab:h-full flex tab:justify-end tab:items-center">
            <button className="hover:text-cyan-500" onClick={toggleSidebar}>
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
