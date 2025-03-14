import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const [scrollDirection, setScrollDirection] = useState("down");
  const controlsText = useAnimation();
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
    if (inView) {
      controlsText.start("visible");
      controlsLeft.start("visible");
      controlsRight.start("visible");
    } else {
      controlsText.start(scrollDirection === "down" ? "hiddenText" : "exitText");
      controlsLeft.start(scrollDirection === "down" ? "hiddenLeft" : "exitLeft");
      controlsRight.start(scrollDirection === "down" ? "hiddenRight" : "exitRight");
    }
  }, [inView, scrollDirection, controlsText, controlsLeft, controlsRight]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation Variants
  const textVariants = {
    hiddenText: { x: "-100vw", opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exitText: { x: "-100vw", opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
  };

  const cardVariants = {
    hiddenLeft: { x: -200, opacity: 0 },
    hiddenRight: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    exitLeft: { x: -200, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
    exitRight: { x: 200, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } },
  };

  return (
    <div ref={ref} className="w-full h-screen flex flex-col items-center ">
      {/* Heading */}
      <motion.h2
        variants={textVariants}
        initial="hiddenText"
        animate={controlsText}
        className="text-5xl font-bold italic h-20 flex items-center justify-center"
      >
        About Us
      </motion.h2>

      {/* Cards Container (Takes Remaining Height) */}
      <div className="w-full p-2 flex-1 flex flex-col md:flex-row justify-center items-center gap-10">
        {/* Left Card (Text) */}
        <motion.div
          variants={cardVariants}
          initial="hiddenLeft"
          animate={controlsLeft}
          className="w-1/2 h-4/6 flex-col bg-gray-800 text-white p-6 rounded-lg shadow-lg flex items-center justify-center text-center"
        >
            <h2 className="text-3xl">Amon Racing</h2>
          <p className="text-lg flex text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, alias Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit in dignissimos ab quo accusamus nemo et eum provident? A nulla tempore delectus aperiam dolorem rem id quasi praesentium natus officia libero laudantium alias blanditiis saepe aut quidem repudiandae excepturi quaerat dignissimos dolore fuga, error, debitis placeat voluptatibus. Aliquid, earum quia.

          </p>
        </motion.div>

        {/* Right Card (Image) */}
        <motion.div
          variants={cardVariants}
          initial="hiddenRight"
          animate={controlsRight}
          className="w-1/2 h-4/6 bg-gray-300 p-6 rounded-lg shadow-lg flex items-center justify-center"
        >
          <img src="https://cdni.autocarindia.com/ExtraImages/20201109055922_Pista-Motor-Raceway-layout.jpg" alt="About Us" className="w-full h-full" />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
