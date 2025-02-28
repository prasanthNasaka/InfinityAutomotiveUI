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
  DoorOpen,
  FlagTriangleRight,
  LayoutTemplate,
  ShieldBan,
} from "lucide-react";

const MainSideBar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuIcon, setMenuIcon] = useState(<FaRegDotCircle />);
  const [hoverMenu, setHoverMenu] = useState(false);

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

      <div className="flex-1 overflow-auto">
        <ul className="p-2 flex flex-col font-serif gap-4">
          <li
            // to="/registration"
            onMouseEnter={() => setHoverMenu(true)}
            onMouseLeave={() => setHoverMenu(false)}
            className=" relative p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg "
          >
            <DoorOpen />
            {!isCollapsed && <span>Entry Desk</span>}

            {hoverMenu && (
              <div className="absolute left-full top-0  w-64 bg-black shadow-lg rounded-md p-2 flex gap-2 flex-col">
                <Link
                  to="/registration"
                  className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg `}
                >
                  <FaRegAddressCard />
                  {!isCollapsed && <span>Racer details</span>}
                </Link>
                <Link
                  to="/vehicle_registration"
                  className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg 
                    `}
                >
                  <FaCar />
                  {!isCollapsed && <span>Vehicle Registration</span>}
                </Link>
              </div>
            )}
          </li>

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
            to="/scrutineerpage"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/current_categ") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FaClipboardList />
            {!isCollapsed && <span>ScrutineerPage</span>}
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
            to="/template"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/template") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <LayoutTemplate />
            {!isCollapsed && <span>Scrutiny Template</span>}
          </Link>
          <Link
            to="/status"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/status") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <ShieldBan /> {!isCollapsed && <span>Status</span>}
          </Link>
          <Link
            to="/report"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 flex items-center gap-3 hover:rounded-lg ${
              isActive("/report") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            <FlagTriangleRight />
            {!isCollapsed && <span>Report</span>}
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default MainSideBar;
