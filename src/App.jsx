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

const App = () => {
  const [auth,setAuth] = useState(false)



  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      setAuth(true)
    }else{
      setAuth(false)
    }
  },[])

  return (
    <section className="w-full h-auto gap-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ auth ? <Navigate to="/dashboard"/> : <Registration />} />
          <Route path="/login" element={auth ? <Navigate to="/dashboard"/>: <Login setAuth={setAuth} />} />
          <Route path="/signup" element={auth ? <Signup />: <Navigate to="/dashboard"/>} />
          <Route path="/dashboard" element={auth ? <Dashboard /> : <Navigate to="/"/>} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/pagenotfound" element={<PageNotFound />} />
          <Route path="/servernotfound" element={<ServerNotFound />} />
          <Route path="/dashboard/link" element={<Live />} />
          <Route path="/dashboard/upcoming" element={<Upcoming />} />
          <Route path="/dashboard/done" element={<Done />} />
          <Route path="/loader" element={<Loader />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
