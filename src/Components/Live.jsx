import Card from "./Card";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Live = () => {
  const swiperRef = useRef(null);

  return (
    <section className="p-2 shadow-md rounded-lg h-fit">
      <div className="w-full font-semibold text-3xl">
        <span>Live Now</span>
      </div>
      <div className="container mx-auto relative ">
        <Swiper
          modules={[Navigation, Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          autoplay={{ delay: 4000 }}
          speed={700}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="overflow-hidden flex justify-between items-center"
        >
          {[...Array(50)].map((_, index) => (
            <SwiperSlide key={index} className="!w-[300px]flex-shrink-0">
              <Card className="!w-[300px]" />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-500 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <div
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="white"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Live;
