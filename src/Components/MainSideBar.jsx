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
      } flex flex-col`}
    >
      <div className="p-2 flex justify-end">
        <button onClick={toggleSidebar} className="text-white text-xl">
          {menuIcon}
        </button>
      </div>

      <div className="flex-1 overflow-auto ">
        <ul className="p-2 flex flex-col font-serif gap-4">
          <div
            className="p-2 rounded-lg relative flex-col flex  gap-3 cursor-pointer"
            onMouseEnter={() => setIsEntryDeskOpen(true)}
            onMouseLeave={() => setIsEntryDeskOpen(false)}
          >
            <div className="flex gap-2">
              <DoorOpen className="text-white" />
              {!isCollapsed && (
                <span className="text-xl text-white">Entry Desk</span>
              )}
            </div>
            {isEntryDeskOpen && (
              <div className=" rounded-lg shadow-lg z-10 right-0 top-full bg-black">
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
          </div>

          <Link
            to="/events"
            className={`p-2  text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
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
              isActive("/timekeeper") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <Building />
            {!isCollapsed && <span>Organizing Committee</span>}
          </Link>
          <Link
            to="/emplogin"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/bigscreen_display") ? "bg-cyan-600 rounded-lg" : ""
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

          <Link
            to="/template"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/template") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <LayoutTemplate />
            {!isCollapsed && <span>Scrutiny Template</span>}
          </Link>

          <div
            className="p-2 rounded-lg relative text-white flex items-center gap-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Crown />

            {!isCollapsed && (
              <span className="text-xl text-white">SuperAdmin</span>
            )}

            {isHovered && (
              <div className="absolute right-0 top-full rounded-lg shadow-lg z-10">
                <Link
                  to="/addcompany"
                  className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-5 hover:rounded-lg ${
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
              </div>
            )}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default MainSideBar;
