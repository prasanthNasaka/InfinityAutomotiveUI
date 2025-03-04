/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Loader from "./Components/Loader";
import Events from "./Components/Events";
import Add_Employee from "./Components/Add_Employee";
import Emp_Login from "./Components/Emp_Login";
import ScrutineerPage from "./Components/ScrutineerPage";
import Table from "./Components/Table";
import TermsAndConditions from "./Components/TermsAndConditions";

import LandingPage from "./Screens/LandingPage";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Forgotpassword from "./Screens/Forgotpassword";
import Registration from "./Screens/Registration";
import Dashboard from "./Screens/Dashboard";
import Main_DriverRaceLink from "./Screens/Main_DriverRaceLink";
import Scrutinys from "./Screens/Scrutinys";
import Vehicledetails from "./Screens/Vehicledetails";
import AddCompany from "./Screens/AddCompany";
import PageNotFound from "./Screens/PageNotFound";
import ServerNotFound from "./Screens/ServerNotFound";
import EventsApproved from "./Screens/EventsApproved";
import Classes from "./Screens/Classes";
import ScrutinyTemplate from "./Screens/ScrutinyTemplate";
import Status from "./Screens/Status";
import Report from "./Screens/Report";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <section className="w-full h-auto gap-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/events" element={<Events />} />
          <Route path="/eventsapproved" element={<EventsApproved/>} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/template" element={<ScrutinyTemplate />} />
          <Route path="/status" element={<Status />} />
          <Route path="/report/:eventId" element={<Report />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/driverracelink"
            element={
              <ProtectedRoute>
                <Main_DriverRaceLink />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scrutiny"
            element={
              <ProtectedRoute>
                <Scrutinys />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicle_registration"
            element={
              <ProtectedRoute>
                <Vehicledetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addcompany"
            element={
              <ProtectedRoute>
                <AddCompany />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addemployee"
            element={
              <ProtectedRoute>
                <Add_Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emplogin"
            element={
              <ProtectedRoute>
                <Emp_Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scrutineerpage"
            element={
              <ProtectedRoute>
                <ScrutineerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultTable"
            element={
              <ProtectedRoute>
                <Table />
              </ProtectedRoute>
            }
          />

          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/servernotfound" element={<ServerNotFound />} />
          <Route path="/loader" element={<Loader />} />

          <Route path="*" element={<Navigate to="/pagenotfound" />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
