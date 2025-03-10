/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaRegDotCircle,
  FaRegCircle,
  FaClipboardList,
  FaTv,
  FaUserCheck,
  FaCalendarAlt,
  FaCar,
  FaRegAddressCard,
} from "react-icons/fa";
import {
  Building,
  CalendarFold,
  Crown,
  DoorOpen,
  LayoutTemplate,
  ShieldBan,
} from "lucide-react";

const MainSideBar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuIcon, setMenuIcon] = useState(<FaRegDotCircle />);
  const [isEntryDeskOpen, setIsEntryDeskOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "101"
  );

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
  }, []);

  return (
    <section
      className={`h-full bg-black transition-all transform ease-in-out duration-700 ${
        isCollapsed ? "w-16" : "w-56"
      } flex flex-col`}
    >
      <div className="p-2 flex justify-end">
        <button onClick={toggleSidebar} className="text-white text-xl">
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <ul className="p-2 flex flex-col font-serif gap-4">
          {/* Show Dashboard for roles 101 and 102 */}
          {(userRole === "101" || userRole === "102") && (
            <Link
              to="/dashboard"
              className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                isActive("/dashboard") ? "bg-cyan-600 rounded-lg" : ""
              }`}
            >
              <FaClipboardList />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
          )}

          {userRole === "100" && ( 
            <>
              <Link
                to="/addcompany"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/addcompany") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaClipboardList />
                {!isCollapsed && <span>Add Company</span>}
              </Link>
              <Link
                to="/eventsapproved"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/eventsapproved") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <CalendarFold />
                {!isCollapsed && <span>Approve Event</span>}
              </Link>
              <Link
                to="/status"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/status") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <ShieldBan />
                {!isCollapsed && <span>Manage Entry Desk</span>}
              </Link>
            </>
          )}

          {userRole === "101" && ( 
            <>
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
                to="/classes"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/classes") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaCalendarAlt />
                {!isCollapsed && <span>Classes</span>}
              </Link>
              <Link
                to="/driverracelink"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/driverracelink") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaUserCheck />
                {!isCollapsed && <span>Registration Desk</span>}
              </Link>
              <Link
                to="/addemployee"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/addemployee") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <Building />
                {!isCollapsed && <span>Organizing Committee</span>}
              </Link>
              <Link
                to="/emplogin"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/emplogin") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaTv />
                {!isCollapsed && <span>Emp Login</span>}
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
            </>
          )}

          {userRole === "102" && ( 
            <>
              <Link
                to="/classes"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/classes") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaCalendarAlt />
                {!isCollapsed && <span>Classes</span>}
              </Link>
              <Link
                to="/driverracelink"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/driverracelink") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaUserCheck />
                {!isCollapsed && <span>Registration Desk</span>}
              </Link>
              <Link
                to="/addemployee"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/addemployee") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <Building />
                {!isCollapsed && <span>Organizing Committee</span>}
              </Link>
              <Link
                to="/emplogin"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/emplogin") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaTv />
                {!isCollapsed && <span>Emp Login</span>}
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
            </>
          )}

          {userRole === "103" && ( 
            <div
              className="p-2 rounded-lg relative flex-col flex gap-3 cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex gap-2">
                <DoorOpen className="text-white" />
                {!isCollapsed && (
                  <span className="text-xl text-white">Entry Desk</span>
                )}
              </div>
              <Link
                to="/registration"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/registration") ? "bg-cyan-600 rounded-lg" : ""
                }`}
              >
                <FaRegAddressCard />
                {!isCollapsed && <span>Racer Details</span>}
              </Link>
              <Link
                to="/vehicle_registration"
                className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                  isActive("/vehicle_registration")
                    ? "bg-cyan-600 rounded-lg"
                    : ""
                }`}
              >
                <FaCar />
                {!isCollapsed && <span>Vehicle Registration</span>}
              </Link>
            </div>
          )}

          {userRole === "104" && ( 
            <Link
              to="/driverracelink"
              className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                isActive("/driverracelink") ? "bg-cyan-600 rounded-lg" : ""
              }`}
            >
              <FaUserCheck />
              {!isCollapsed && <span>Registration Desk</span>}
            </Link>
          )}

          {userRole === "105" && ( 
            <Link
              to="/scrutiny"
              className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
                isActive("/scrutiny") ? "bg-cyan-600 rounded-lg" : ""
              }`}
            >
              <FaClipboardList />
              {!isCollapsed && <span>Scrutiny</span>}
            </Link>
          )}
        </ul>
      </div>
    </section>
  );
};

export default MainSideBar;
