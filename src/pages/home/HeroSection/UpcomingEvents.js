"use-client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingEvents } from "@/store/slices/eventSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import SkeletonCard from "@/components/shared/skeletonCard";
import { Card } from "@/components/UI/EventCard";
import { FailedApiComponent } from "@/components/UI/FailedComponent";
import Button from "@/components/UI/OutLineButton";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const upcomingEventsState = useSelector((state) => state.event);
  const { status, upcomingItems, error } = upcomingEventsState;

  useEffect(() => {
    dispatch(fetchUpcomingEvents());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="py-8">
        <h2 className="text-galactic-text text-3xl lg:text-5xl font-extrabold pb-16 text-center">
          Upcoming Events
        </h2>
        <div className="relative overflow-hidden px-6 min-[425px]:px-8 lg:px-6 xl:px-10">
          <Swiper
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 20 },
              425: { slidesPerView: 1.25, spaceBetween: 2 },
              640: { slidesPerView: 2.5, spaceBetween: 12 },
              800: { slidesPerView: 3, spaceBetween: 10 },
              1200: { slidesPerView: 4, spaceBetween: 2 },
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            freeMode={true}
            speed={6000}
            loop={true}
            modules={[FreeMode, Pagination, Autoplay]}
            className="flex"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index}>
                <SkeletonCard key={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }

  // if (status === "failed") return <FailedApiComponent error={error} />;

  return (
    <>
      <div className=" overflow-hidden ">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 20 },
            425: { slidesPerView: 1.25, spaceBetween: 2 },
            640: { slidesPerView: 2.5, spaceBetween: 12 },
            800: { slidesPerView: 3, spaceBetween: 10 },
            1200: { slidesPerView: 4, spaceBetween: 2 },
          }}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          freeMode={true}
          speed={6000}
          loop={true}
          modules={[FreeMode, Pagination, Autoplay]}
          className="flex"
        >
          {upcomingItems.map((event, index) => (
            <SwiperSlide key={event._id || `event-${index}`}>
              <Card key={event._id} data={event} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default UpcomingEvents;
