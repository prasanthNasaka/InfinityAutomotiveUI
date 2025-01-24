import Body from "../Components/Body";
import Newheader from "../Components/Header";

import Sidebar from "../Components/Sidebar";
const LandingPage = () => {
  return (
    <section className="w-full h-screen flex-grow">
      <div className="h-full flex flex-col">
        <div className="h-24 w-full">
          <Newheader />
        </div>
        <div className="flex h-[calc(100vh-6rem)]">
          <div className="w-2/12 h-full iphone:hidden phone:hidden desk:block lappy:block tab:hidden ">
            <Sidebar />
          </div>
          <div className="w-10/12 h-full overflow-y-auto flex-grow p-2 tab:w-full iphone:w-full phone:w-full">
            <Body />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
