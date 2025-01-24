import { Link, useLocation } from "react-router-dom";

const MainSideBar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <section className="w-48 bg-blue-500 h-screen">
      <div className="flex-grow">
        <ul className="p-2 flex flex-col font-serif">
          <Link
            to="/dashboard/live"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/live") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Tmr - Login
          </Link>
          <Link
            to="/dashboard/upcoming"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/upcoming") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/done"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/done") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Registration
          </Link>
          <Link
            to="/dashboard/events"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/events") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Events
          </Link>
          <Link
            to="/dashboard/link race & drv"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/link race & drv")
                ? "bg-cyan-600 rounded-lg"
                : ""
            }`}
          >
            Link race and drv
          </Link>
          <Link
            to="/dashboard/timekeeper"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/timekeeper") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            TimeKeeper scrn
          </Link>
          <Link
            to="/dashboard/bigscreen_display"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/bigscreen_display")
                ? "bg-cyan-600 rounded-lg"
                : ""
            }`}
          >
            BigScr Display
          </Link>
          <Link
            to="/dashboard/current_categ"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/current_categ")
                ? "bg-cyan-600 rounded-lg"
                : ""
            }`}
          >
            Current categ result
          </Link>
          <Link
            to="/dashboard/tmr"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/tmr") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            Tmr - App lic
          </Link>
          <Link
            to="/dashboard/scrutiny"
            className={`p-2 text-lg text-white cursor-pointer hover:bg-cyan-600 hover:rounded-lg ${
              isActive("/dashboard/scrutiny") ? "bg-cyan-600 rounded-lg" : ""
            }`}
          >
            scrutiny
          </Link>
        </ul>
      </div>
    </section>
  );
};

export default MainSideBar;
