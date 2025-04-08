import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaFlagCheckered } from "react-icons/fa";
import { Link } from "react-router-dom";

const Landingheader = () => {
  const [opacity, setOpacity] = useState(100);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const newOpacity = Math.min(100, 25 + scrollY / 2); // Reversed opacity logic
      setOpacity(newOpacity);
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className="fixed overflow-x-hidden top-0 left-0 w-full p-4 transition-opacity duration-300 z-50"
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity / 100})` }} // Only background opacity
    >
      <div className="  container mx-auto flex justify-between items-center">
        <div className="flex ">
          <FaFlagCheckered className="text-3xl" />

          <h1 className="text-3xl font- font-bold text-cyan-500">Amon</h1>
          <h1 className="text-3xl font-bold text-black">Racing</h1>
        </div>

        <nav>
        <Link className="text-black cursor-pointer" to={"/login"}>
          <motion.button
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative flex items-center bg-cyan-500 text-white font-semibold px-10 p-2 py-3 rounded-full overflow-hidden transition-all duration-300"
          >
            {/* Expanding Circle */}
            <motion.div
              initial={{ width: "40px" }}
              animate={{ width: hovered ? "100%" : "40px" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute left-0 top-0 bottom-0 bg-cyan-600 rounded-full flex items-center justify-center"
            >
              <motion.span
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 px-4"
              >
                Login
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: hovered ? 10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.span>
            </motion.div>

            {/* Static Arrow Inside Circle */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: hovered ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <ArrowRight size={20} />
            </motion.div>
          </motion.button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Landingheader;
