import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaRegDotCircle,
  FaRegCircle,
  FaClipboardList,
  FaTv,
  FaClock,
  FaUserCheck,
  FaCalendarAlt,
  FaCar,
  FaRegAddressCard,
} from "react-icons/fa";

const MainSideBar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuIcon, setMenuIcon] = useState(<FaRegDotCircle />);

  const isActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setMenuIcon(isCollapsed ? <FaRegDotCircle /> : <FaRegCircle />);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setIsCollapsed(true);
        setMenuIcon(isCollapsed ? <FaRegDotCircle /> : <FaRegCircle />);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      className={`h-full bg-black transition-all transform ease-in-out duration-700 ${
        isCollapsed ? "w-16" : "w-56"
      }`}
    >
      
      <div className="p-2 flex justify-end">
        <button onClick={toggleSidebar} className="text-white text-xl">
          {menuIcon}
        </button>
      </div>

     
      <div className="flex-grow">
        <ul className="p-2 flex flex-col font-serif gap-5">
          <Link
            to="/registration"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/registration") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaRegAddressCard />
            {!isCollapsed && <span>Racer details</span>}
          </Link>
          <Link
            to="/vehicle_registration"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/vehicle_registration") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaCar />
            {!isCollapsed && <span>Vehicle Registration</span>}
          </Link>
          <Link
            to="/events"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/events") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaCalendarAlt />
            {!isCollapsed && <span>Events</span>}
          </Link>
          <Link
            to="/driverracelink"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/driverracelink") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaUserCheck />
            {!isCollapsed && <span>Mapping</span>}
          </Link>
          <Link
            to="/timekeeper"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/timekeeper") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaClock />
            {!isCollapsed && <span>TimeKeeper</span>}
          </Link>
          <Link
            to="/bigscreen_display"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/bigscreen_display") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaTv />
            {!isCollapsed && <span>BigScr Display</span>}
          </Link>
          <Link
            to="/current_categ"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/current_categ") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaClipboardList />
            {!isCollapsed && <span>Results</span>}
          </Link>
          <Link
            to="/scrutiny"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/scrutiny") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaClipboardList />
            {!isCollapsed && <span>Scrutiny</span>}
          </Link>
          <Link
            to="/addcompany"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/addcompany") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaClipboardList />
            {!isCollapsed && <span>Add Company</span>}
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default MainSideBar;
