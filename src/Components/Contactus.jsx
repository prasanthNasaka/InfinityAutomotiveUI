import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsFillSendArrowUpFill } from "react-icons/bs";

const Contactus = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  // Animation for form
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]); // Fade in effect
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]); // Slide up effect

  return (
    <div ref={ref} className="w-full h-screen relative flex items-center justify-center overflow-hidden ">
      {/* Left Side: Flag Animation */}
      <div className="absolute left-0 w-1/2 h-full flex items-center justify-center">
        <motion.div
          className="flag-container"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }} // Scroll effect
        >
          <div className="flag"></div>
        </motion.div>
      </div>

      {/* Right Side: Contact Form */}
      <motion.div
        style={{ opacity, y }}
        className="relative w-1/2 flex flex-col items-center justify-center"
      >
        <h2 className="text-4xl font-bold mb-8 text-gray-800">Contact Us</h2>
        <form className="w-3/4 bg-gray-50 p-8 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 mb-4 border rounded-lg"
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#06b6d4",
              boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-cyan-500 text-white px-6 py-2 rounded-full flex items-center justify-center gap-2"
          >
            <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              Send Message
            </motion.span>
            <motion.div whileHover={{ rotate: 20 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <BsFillSendArrowUpFill className="text-lg" />
            </motion.div>
          </motion.button>
        </form>
      </motion.div>

      {/* Flag Animation CSS */}
      {/* <style>{`
        .flag-container {
          position: relative;
          width: 200px;
          height: 120px;
        }

        .flag {
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, black 40%, cyan 60%);
          border-radius: 10px;
          animation: wave 2s infinite ease-in-out;
        }

        @keyframes wave {
          0% { transform: rotate(0deg) skewX(5deg); }
          50% { transform: rotate(2deg) skewX(-5deg); }
          100% { transform: rotate(0deg) skewX(5deg); }
        }
      `}</style> */}
    </div>
  );
};

export default  Contactus;
