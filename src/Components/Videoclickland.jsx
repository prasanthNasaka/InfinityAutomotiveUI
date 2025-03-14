import { ChevronDown } from "lucide-react";
import dodge from "../assets/dodge.mp4"
import { AnimatePresence, motion } from "framer-motion";
import  { useEffect, useState } from "react";

const Videoclickland = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Handle button click to scroll to the next section
  const handleClick = () => {
    setIsClicked(true);
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  // Handle scroll up to rejoin the button slowly
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight / 2) {
        setIsClicked(false); // Rejoin the button when scrolled up
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
  {/* Video Background with Enhanced Zoom Effect */}
  <motion.video
    initial={{ opacity: 0, scale: 1.2 }} // Zoomed in at start
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
    autoPlay
    loop
    muted
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src={dodge}
  >
    Your browser does not support the video tag.
  </motion.video>

  {/* Overlay Section with Blurred Background */}
  <div className="relative z-10 flex flex-col w-full h-screen items-center justify-center text-center px-4 bg-black bg-opacity-30 backdrop-blur-sm">
    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
      className="text-white text-6xl font-extrabold mb-4 tracking-wider drop-shadow-lg"
    >
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="text-cyan-500"
      >
        Amon
      </motion.span>{" "}
      <motion.span
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="text-white"
      >
        Racing
      </motion.span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 1.5 }}
      className="text-gray-200 text-lg max-w-lg mx-auto leading-relaxed"
    >
     Every second counts..Every corner matters..
    </motion.p>

    {/* Glowing Animated Button */}
    <div className="relative">
      {/* Button or Broken Pieces */}
      <AnimatePresence>
        {isClicked ? (
          // Broken Pieces
          <motion.div
            key="broken"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex space-x-2"
          >
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ y: 0, x: 0 }}
                animate={{ y: 50, x: index * 20 - 20 }}
                transition={{ duration: 1 }}
                className="w-4 h-4 bg-cyan-600 rounded-full"
              />
            ))}
          </motion.div>
        ) : (
          // Intact Button
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ height: 120, width: "auto" }} // Expand downward and adjust width
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={handleClick}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all relative overflow-hidden flex items-center justify-center"
            style={{ height: isHovered ? 120 : 48, width: isHovered ? "auto" : "200px" }} // Dynamic height and width
          >
            {/* Button Text */}
            <AnimatePresence>
              {!isHovered && (
                <motion.span
                  key="text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  Get Started
                </motion.span>
              )}
            </AnimatePresence>

            {/* Blinking Arrows (Stacked in a Column) */}
            {isHovered && (
              <motion.div
                className="flex flex-col space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {[1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [0, -5, 0], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    <ChevronDown className="text-white" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  </div>
</div>

  );
}

export default Videoclickland