import Dashboard from "./Screens/Dashboard";
import Forgotpassword from "./Screens/Forgotpassword";
import Login from "./Screens/Login";
import PageNotFound from "./Screens/PageNotFound";
import Signup from "./Screens/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <section className="w-full h-auto gap-2">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forgotpassword" element={<Forgotpassword />} />
          <Route path="pagenotfound" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
