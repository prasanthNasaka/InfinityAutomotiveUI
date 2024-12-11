import Login from "./Screens/Login";
import Footer from "./Components/Footer";

// import Signup from "./Screens/Signup";

const App = () => {
  return (
    <section>
      <div className="flex flex-col">
        <Login />
        <Footer />
        {/* <Signup /> */}
      </div>
    </section>
  );
};

export default App;
