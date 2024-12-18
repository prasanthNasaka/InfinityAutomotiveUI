import Body from "../Components/Body";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

const Dashboard = () => {
  return (
    <section className="w-full h-auto">
      <div className="w-full h-full">
        <Header />
      </div>
      <div className="w-full h-full flex">
        <div className="w-2/12 h-screen border border-red-500">
          <Sidebar />
        </div>
        <div className="w-10/12 h-screen border border-red-500">
          <Body />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
