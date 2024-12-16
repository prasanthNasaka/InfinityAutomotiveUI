import Dashboard from "./Screens/Dashboard";
import Login from "./Screens/Login";
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
        </Routes>
      </BrowserRouter>
    </section>
  );
};

export default App;
