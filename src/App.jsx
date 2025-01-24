import { useEffect, useState } from "react";
import Done from "./Components/Done";
import Live from "./Components/Live";
import Upcoming from "./Components/Upcoming";
import Dashboard from "./Screens/Dashboard";
import Forgotpassword from "./Screens/Forgotpassword";
import Login from "./Screens/Login";
import PageNotFound from "./Screens/PageNotFound";
import Registration from "./Screens/Registration";
import ServerNotFound from "./Screens/ServerNotFound";
import Signup from "./Screens/Signup";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./Components/Loader";
import Main_Dashboard from "./Screens/Main_Dashboard";

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/dashboard" element={<Main_Dashboard />} />
          <Route
            path="/dashboard"
            element={auth ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/dashboard" /> : <Registration />}
          />
          <Route
            path="/signup"
            element={auth ? <Navigate to="/dashboard" /> : <Signup />}
          />
          <Route path="/forgotpassword" element={<Forgotpassword />} />

          <Route
            path="/dashboard"
            element={auth ? <Dashboard /> : <Navigate to="/" />}
          >
            <Route path="live" element={<Live />} />
            <Route path="upcoming" element={<Upcoming />} />
            <Route path="done" element={<Done />} />
          </Route>

          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/servernotfound" element={<ServerNotFound />} />

          <Route path="*" element={<Navigate to="/pagenotfound" />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
