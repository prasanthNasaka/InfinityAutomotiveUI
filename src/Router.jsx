/* eslint-disable react/prop-types */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import Events from "./Components/Events";
import Add_Employee from "./Components/Add_Employee";
import Emp_Login from "./Components/Emp_Login";
import ScrutineerPage from "./Components/ScrutineerPage";
import Table from "./Components/Table";
import Forgotpassword from "./Screens/Forgotpassword";
import TermsAndConditions from "./Components/TermsAndConditions";
import LandingPage from "./Screens/LandingPage";
import Login from "./Screens/Login";
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
import RegistrationDeskPopUp from "./Screens/RegistrationDeskPopUp";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/table/:eventId" element={<Table />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/registrationdesk" element={<RegistrationDeskPopUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/registration"
          element={
            <ProtectedRoute>
              <Registration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/eventsapproved"
          element={
            <ProtectedRoute>
              <EventsApproved />
            </ProtectedRoute>
          }
        />
        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/terms"
          element={
            <ProtectedRoute>
              <TermsAndConditions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/template"
          element={
            <ProtectedRoute>
              <ScrutinyTemplate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report/:eventId"
          element={
            <ProtectedRoute>
              <Report />
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
  );
};

export default Router;
