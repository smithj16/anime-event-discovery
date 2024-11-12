//Upcoming Events Component
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import { Card } from "@/components/UI/EventCard";
import { FailedApiComponent } from "@/components/UI/FailedComponent";

const UpcomingEvents = ({ events }) => {
  if (!events || events.length === 0) {
    return <FailedApiComponent />;
  }

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
          {events.map((event, index) => (
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
