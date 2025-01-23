import Card from "./Card";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Upcoming = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full h-24">
        <Header />
      </div>

      <div className="flex h-[calc(100vh-6rem)]">
        <div className="w-2/12 h-full iphone:hidden phone:hidden desk:block lappy:block tab:hidden ">
          <Sidebar />
        </div>
        <div className="w-10/12 p-2 flex flex-wrap h-full overflow-y-scroll">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
