import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BsFillSendArrowUpFill } from "react-icons/bs";

const Contactus = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  // Form animations
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // Background animations
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const bgHue = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={ref} className="w-full h-screen relative overflow-hidden ">
      {/* Crazy Background Elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        style={{
          rotate: bgRotate,
          scale: bgScale,
          background: `linear-gradient(${useTransform(scrollYProgress, [0, 1], [0, 360])}deg, 
                       hsl(${bgHue}, 80%, 50%), 
                       hsl(${useTransform(scrollYProgress, [0, 1], [120, 480])}, 80%, 50%)`
        }}
      >
       
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              background: `hsl(${Math.random() * 360}, 80%, 60%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              rotate: (scrollYProgress, [0, 1], [0, 360 * (i % 2 ? 1 : -1)]),
              scale: (scrollYProgress, [0, 1], [1, 1.5 + Math.random()]),
              opacity: (scrollYProgress, [0, 1], [0.2, 0.8])
            }}
            animate={{
              y: [0, 100, 0],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}

        
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: useTransform(scrollYProgress, [0, 1], [0.3, 0.7]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Pulsing circles */}
        <motion.div 
          className="absolute rounded-full border-2 border-cyan-400"
          style={{
            width: '50vw',
            height: '50vw',
            top: '25%',
            left: '25%',
            opacity: useTransform(scrollYProgress, [0, 1], [0.1, 0.3]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5])
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Contact Form */}
      <motion.div
        style={{ opacity, y }}
        className="absolute w-full h-full flex flex-col items-center justify-center"
      >
        <h2 className="text-4xl font-bold mb-8 ">Contact Us</h2>
        <form className="w-3/4  bg-opacity-70 p-8 rounded-lg shadow-lg backdrop-blur-sm border  bg-white">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4  border border-cyan-400 rounded-lg  focus:outline-none focus:ring-2 "
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4  border border-cyan-400 rounded-lg  focus:outline-none focus:ring-2 "
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 mb-6  border border-cyan-400 rounded-lg  focus:outline-none focus:ring-2 "
          />
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#06b6d4",
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-cyan-500 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 text-lg"
          >
            <motion.span whileHover={{ x: 5 }}>
              Send Message
            </motion.span>
            <motion.div whileHover={{ rotate: 20 }}>
              <BsFillSendArrowUpFill className="text-xl" />
            </motion.div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contactus;