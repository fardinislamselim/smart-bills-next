"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// CSS Imports
import instanceance from "@/hook/useAxios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const [bills, setBills] = useState([]); // Added simple type safety

  // Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await instanceance.get("/bills/latest3");
        setBills(data);
      } catch (err) {
        console.error("Error fetching latest bills:", err);
      }
    };
    fetchData();
  }, []);

  // Always use static gradients now since theme detection is removed
  const bgGradient = "from-[#eef2ff] via-[#e0e7ff] to-[#eef2ff]";
  const overlayGradient = "from-base-100/60 via-transparent to-transparent";

  return (
    <div
      className={`relative w-full overflow-hidden bg-gradient-to-r ${bgGradient} transition-colors duration-500`}
    >
      {bills.length > 0 ? (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          loop={bills.length > 1}
          className="h-fit"
        >
          {bills.map((bill) => (
            <SwiperSlide key={bill._id}>
              <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 gap-10">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left space-y-5">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-primary drop-shadow-sm leading-tight min-h-[3rem] md:min-h-[4rem]">
                    <Typewriter
                      words={[bill.title]}
                      loop={1}
                      cursor
                      cursorStyle="_"
                      typeSpeed={70}
                      deleteSpeed={50}
                      delaySpeed={2000}
                    />
                  </h1>

                  <p className="text-base md:text-lg text-base-content/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                    {bill.description?.length > 180
                      ? bill.description.slice(0, 180) + "..."
                      : bill.description}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm font-medium text-base-content/70">
                    <span className="badge badge-primary capitalize">
                      {bill.category}
                    </span>
                    <span>📅 {bill.date}</span>
                    <span>💰 {bill.amount} BDT</span>
                    <span>📍 {bill.location}</span>
                  </div>

                  <Link
                    href={`/bill/${bill._id}`}
                    className="btn btn-primary mt-6 px-6 py-2 text-base rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    View Details
                  </Link>
                </div>

                {/* Image Content */}
                <div className="flex-1 relative flex justify-center items-center">
                  <div
                    className={
                      "absolute w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full blur-3xl opacity-40 bg-secondary/30"
                    }
                  ></div>
                  <img
                    src={bill.image}
                    alt={bill.title}
                    className={`relative z-10 w-60 h-60 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] object-cover rounded-2xl shadow-xl border-4 border-base-200 hover:scale-105 transition-transform duration-500`}
                  />
                  <div className="absolute z-10 bottom-4 right-5 sm:right-8 backdrop-blur-md bg-base-100/70 text-primary font-semibold px-4 py-2 rounded-lg shadow-md text-sm">
                    {bill.category}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center flex-col items-center py-20">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlayGradient} pointer-events-none transition-colors duration-500`}
      ></div>
    </div>
  );
};

export default Banner;
