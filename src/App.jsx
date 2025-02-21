import { useEffect, useState } from "react";

import Forgotpassword from "./Screens/Forgotpassword";
import Login from "./Screens/Login";
import PageNotFound from "./Screens/PageNotFound";
import Registration from "./Screens/Registration";
import ServerNotFound from "./Screens/ServerNotFound";
import Signup from "./Screens/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import LandingPage from "./Screens/LandingPage";
import Dashboard from "./Screens/Dashboard";
import Main_DriverRaceLink from "./Screens/Main_DriverRaceLink";
import Events from "./Components/Events";
import Scrutinys from "./Screens/Scrutinys";
import Vehicledetails from "./Screens/Vehicledetails";
import AddCompany from "./Screens/AddCompany";
import Home from "./Screens/Home";
import Add_Employee from "./Components/Add_Employee";
import Emp_Login from "./Components/Emp_Login";
import ScrutineerPage from "./Components/ScrutineerPage";
import Table from "./Components/Table";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuth(!!token);
  }, []);

  return (
    <section className="w-full h-auto gap-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/driverracelink" element={<Main_DriverRaceLink />} />
          <Route path="/scrutiny" element={<Scrutinys />} />
          <Route path="/vehicle_registration" element={<Vehicledetails />} />
          <Route path="/addcompany" element={<AddCompany />} />
          <Route path="/addemployee" element={<Add_Employee />} />
          <Route path="/emplogin" element={<Emp_Login />} />
          <Route path="/scrutineerpage" element={<ScrutineerPage />} />
          <Route path="/resultTable" element={<Table />} />

          <Route
            path="/driverracelink"
            element={auth ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route path="/events" element={<Events />} />

          <Route
            path="/dashboard"
            element={auth ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="/signup"
            element={auth ? <Navigate to="/" /> : <Signup />}
          />

          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/servernotfound" element={<ServerNotFound />} />
          <Route path="*" element={<Navigate to="/pagenotfound" />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
