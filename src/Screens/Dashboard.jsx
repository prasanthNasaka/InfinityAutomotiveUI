import Card from "../Components/Card";
import MainSideBar from "../Components/MainSideBar";
import Newheader from "../Components/Newheader";

const Dashboard = () => {
  return (
    <section>
      <div className="h-24 w-full">
        <Newheader />
      </div>
      <div className="flex  h-[calc(100vh-6rem)]">
        <div className="flex h-full">
          <MainSideBar />
        </div>
        <div className="flex flex-wrap h-full w-full overflow-y-auto gap-4">
        <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
