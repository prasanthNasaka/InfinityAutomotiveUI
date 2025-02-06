import Done from "../Components/Done";
import Newheader from "../Components/Header";
import Live from "../Components/Live";
import Upcoming from "../Components/Upcoming";
// import Sidebar from "../Components/Sidebar";

const LandingPage = () => {
  return (
    <section className="w-full h-screen">
      <div className="h-full flex flex-col">
        {/* Header Section */}
        <div className="h-24 w-full  ">
          <Newheader />
        </div>

        <div className="flex flex-col  h-[calc(100vh-6rem)] p-2">
          <div className="h-full flex flex-col gap-20">
            <div className="w-full h-1/3 p-2 tab:w-full iphone:w-full phone:w-full">
              <Live />
            </div>
            <div className="w-full h-1/3 p-2 tab:w-full iphone:w-full phone:w-full">
              <Upcoming />
            </div>
            <div className="w-full h-1/3 p-2 tab:w-full iphone:w-full phone:w-full">
              <Done />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
