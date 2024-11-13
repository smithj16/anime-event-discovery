import React, { useRef } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

const Features = ({ events }) => {
  return (
    <div className="relative bg-white rounded-badge mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-10">
      <Copy />
      <Carousel events={events} />
    </div>
  );
};

const Copy = () => {
  return (
    <div className="flex h-fit w-full flex-col justify-center py-12 md:sticky md:top-0 md:h-screen">
      <span className="w-fit rounded-full bg-galactic-complementaryOrange px-4 py-2 text-sm uppercase text-indigo-100">
        Lorem ipsum dolor
      </span>
      <h2 className="mb-4 mt-2 text-5xl text-galactic-primary font-medium leading-tight">
        Learn and grow with Lorem Ipsum Dolor
      </h2>
      <p className="text-lg text-galactic-lightGray">
        Lorem ipsum dolor sit amet consectetur. Dolor quis a leo lobortis orci
        tortor eget. Enim proin aliquam nulla a lacus pellentesque quam in. Nec
        vel vel nulla nunc vel in molestie proin convallis. Leo et vulputate
        tincidunt justo a varius et elementum.
      </p>
    </div>
  );
};

const Carousel = ({ events }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div className="relative w-full">
      <Gradient />

      <div ref={ref} className="relative z-0 flex flex-col gap-6 md:gap-12">
        {events.map((event, index) => (
          <CarouselItem
            key={event._id}
            scrollYProgress={scrollYProgress}
            position={index + 1}
            numItems={events.length}
            event={event} // Pass the event data to CarouselItem
          />
        ))}
      </div>

      <Buffer />
    </div>
  );
};

const CarouselItem = ({ scrollYProgress, position, numItems, event }) => {
  const stepSize = 1 / numItems;
  const end = stepSize * position;
  const start = end - stepSize;

  const opacity = useTransform(scrollYProgress, [start, end], [1, 0], {
    type: "spring",
    stiffness: 100,
    damping: 20,
  });

  const scale = useTransform(scrollYProgress, [start, end], [1, 0.75], {
    type: "spring",
    stiffness: 100,
    damping: 20,
  });

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative grid aspect-video w-full shrink-0 rounded-2xl overflow-hidden bg-neutral-900 will-change-transform will-change-opacity"
    >
      {/* Background Image */}
      <Image
        src={event.images.card}
        alt={event.name}
        layout="fill"
        objectFit="cover"
        quality={60}
        loading="eager"
        className="absolute inset-0 h-full w-full"
      />

      {/* Overlay Content */}
      <div className="relative z-10 p-4 bg-black bg-opacity-50 rounded-2xl flex flex-col justify-end h-full group">
        <h2 className="text-2xl font-bold text-white">{event.name}</h2>
        <p className="text-sm text-neutral-300">
          {new Date(event.date).toDateString()}
        </p>
        {/* Hidden Description */}
        <p className="mt-2 text-neutral-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2 md:line-clamp-none">
          {event.description}
        </p>
        {/* Call-to-Action Button */}
        <a
          href={event.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 opacity-0 group-hover:opacity-100"
        >
          Learn More
        </a>
      </div>
    </motion.div>
  );
};

export default Features;

const Gradient = () => (
  <div className="sticky top-0 z-10 hidden h-24 w-full bg-gradient-to-b from-indigo-50 to-indigo-50/0 md:block" />
);

const Buffer = () => <div className="h-24 w-full md:h-48" />;
