import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Card from "../Components/Card";
import { BsCircleFill } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

const Cardsection = () => {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [liveEvents, setLiveEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  const controls = useAnimation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollDirection === "down") {
      controls.start({ x: "0%", transition: { duration: 1, ease: "easeOut" } }); // Move in from full left
    } else if (scrollDirection === "up") {
      controls.start({
        x: "-100vw",
        transition: { duration: 1, ease: "easeIn" },
      }); // Move fully back left
    }
  }, [scrollDirection, controls]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://c4pfntkn-7206.inc1.devtunnels.ms/api/LandingPage"
        );
        const data = await response.json();
        setLiveEvents(data.liveEvents);
        setUpcomingEvents(data.upcommingEvents);
        setCompletedEvents(data.completedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className=" w-full min-h-screen border ">
      {/* Header Section */}
      <div className="w-full h-auto p-2 flex justify-center items-center overflow-hidden">
        <motion.span
          initial={{ x: "-100vw" }} // Start off-screen fully left
          animate={controls} // Controlled by scroll
          className="text-7xl font-mono italic font-bold "
        >
          Events
        </motion.span>
      </div>

      
      <div className="w-full h-screen flex flex-row gap-4 px-4">
        
        <div className="w-3/4 h-full flex flex-col overflow-x-auto">
          
          <div className="w-full h-1/2 flex flex-col">
            <div className="w-full h-auto flex items-center gap-2">
              <span className="text-3xl font-mono p-2 ">Live</span>
              <BsCircleFill className="text-red-500 text-xl animate-pulse" />
            </div>
            <div className="w-full h-full overflow-x-auto flex flex-row gap-2 p-2 flex-grow">
              {liveEvents.map((event) => (
                <Card key={event.eventid} event={event} type="live" />
              ))}
            </div>
          </div>

          
          <div className="w-full h-1/2 flex flex-col">
            <div className="w-full h-auto flex items-center gap-2">
              <span className="text-3xl font-mono p- ">Upcoming</span>
              <BsArrowRight className="text-yellow-500 text-3xl animate-bounce" />
            </div>
            <div className="w-full h-full overflow-x-auto flex flex-row gap-2 p-2 flex-grow">
              {upcomingEvents.map((event) => (
                <Card key={event.eventid} event={event} type="upcoming" />
              ))}
            </div>
          </div>
        </div>

        
        <div className="w-1/4 h-full flex flex-col  overflow-y-scroll">
  <div className="w-full h-auto flex items-center gap-2 sticky top-0">
    <span className="text-3xl font-mono p-2">Completed</span>
    <span className="text-3xl font-mono animate-pulse">🎯</span>
  </div>

  {/* Added `flex-1 min-h-0` to ensure it takes available space and scrolls properly */}
  <div className="w-full flex-1 h-fit  flex flex-col gap-2 p-2">
    {completedEvents.map((event) => (
      <Card key={event.eventid} event={event} type="completed" />
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default Cardsection;
