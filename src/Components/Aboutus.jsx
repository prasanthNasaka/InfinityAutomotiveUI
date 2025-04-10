import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutUs = () => {
  const controls = useAnimation();
  const imageControls = useAnimation();
  const [isScrolling, setIsScrolling] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      // Clear any existing timeout
      clearTimeout(scrollTimeout);

      // Set scrolling to true
      setIsScrolling(true);

      // Set a timeout to set scrolling to false after scrolling stops
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // Adjust this timeout as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useEffect(() => {
    if (inView) {
      imageControls.start({
        opacity: 1,
        x: "0%",
        transition: {
          duration: 1.2,
          ease: "easeInOut",
        },
      });
    } else {
      imageControls.start({
        opacity: 0,
        x: "50%",
        transition: {
          duration: 1.2,
          ease: "easeInOut",
        },
      });
    }
  }, [inView, imageControls]);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, isScrolling, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.6,
      },
    },
  };

  const imageAnim = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={ref}
      className="w-full min-h-screen flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-white "
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate={controls}
        className="w-full max-w-6xl mx-auto flex flex-col  items-center"
      >
        <div className="w-full overflow-hidden">
          <motion.img
            className="w-1/2 transition-all duration-1000"
            src="https://media.formula1.com/image/upload/f_auto,c_limit,w_1440,q_auto/f_auto,c_fill,q_auto,w_1320,g_faces,ar_16:9/content/dam/fom-website/manual/Misc/2023manual/Pre-season/February/AMR/6_AM23_CAR_2392%20TC"
            alt=""
            initial={{ opacity: 0, x: "50%" }}
            animate={imageControls}
          />
        </div>

        {/* Text Content - Left Side */}
        <div className="flex items-center">
          <motion.div
            variants={item}
            className="flex flex-col items-start justify-center space-y-6"
          >
            <motion.h2
              variants={item}
              className="text-4xl md:text-5xl font-bold text-gray-900"
            >
              About Us
            </motion.h2>

            <motion.h3
              variants={item}
              className="text-2xl font-semibold text-cyan-500"
            >
              Amon Racing
            </motion.h3>

            <motion.p
              variants={item}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui,
              alias Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Impedit in dignissimos ab quo accusamus nemo et eum provident? A
              nulla tempore delectus aperiam dolorem rem id quasi praesentium
              natus officia libero laudantium alias blanditiis saepe aut quidem
              repudiandae excepturi quaerat dignissimos dolore fuga, error,
              debitis placeat voluptatibus. Aliquid, earum quia.
            </motion.p>

            <motion.button
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
               className="w-1/2 py-3 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 hover:text-black transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Image - Right Side */}
          <motion.div
            variants={imageAnim}
            className="w-full h-full rounded-xl overflow-hidden shadow-xl"
          >
            <img
              src="https://cdni.autocarindia.com/ExtraImages/20201109055922_Pista-Motor-Raceway-layout.jpg"
              alt="Race Track"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutUs;
