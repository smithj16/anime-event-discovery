//hero section
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../../shared/components/UI/OutLineButton";
import { useRouter } from "next/router";

const heroImages = {
  Image1: "/images/heroImages/animeRestaurant.png",
  Image2: "/images/heroImages/bleach.png",
  Image3: "/images/heroImages/redEyeGirl.jpg",
};

import UpcomingEvents from "./UpcomingEvents";

const HeroSection = ({ upcomingEventsData }) => {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);
  const [loopCount, setLoopCount] = useState(0); // Keeps track of the number of loops

  useEffect(() => {
    // Set a 6-second delay to switch from initial UI to video
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [loopCount]); // Restart the timer every time the loopCount changes

  const handleVideoEnd = () => {
    // When the video ends, switch back to the original UI
    setShowVideo(false);

    // Increment the loop count to trigger the next cycle
    setLoopCount((prev) => prev + 1);
  };

  return (
    <section className="relative p-10 bg-galactic-darkGray">
      <div className="relative  w-full flex flex-col items-center justify-center h-[750px]">
        <AnimatePresence>
          {!showVideo && (
            <motion.div
              key="initialUI"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { ease: "easeInOut", duration: 1 },
              }}
              className="absolute w-full h-full flex flex-col items-center justify-center text-center"
            >
              <h2 className="pb-4 md:text-7xl xl:text-9xl text-galactic-complementaryOrange font-[Special-Elite]">
                Anime Event Discovery
              </h2>
              <div className="flex -space-x-6  mb-2 px-8">
                <div className="flex-1">
                  <Image
                    src={heroImages?.Image1}
                    alt="heroImage"
                    width={400}
                    height={400}
                    priority
                    className="w-3/5 h-auto border-2 border-black skew-y-6 translate-y-6"
                  />
                </div>
                <div className="flex-1">
                  <Image
                    src={heroImages?.Image2}
                    alt="heroImage"
                    width={400}
                    height={400}
                    priority
                    className="w-3/5 h-auto border-2 border-black -rotate-90 skew-y-3"
                  />
                </div>
                <div className="flex-1">
                  <Image
                    src={heroImages?.Image3}
                    alt="heroImage"
                    width={400}
                    height={400}
                    priority
                    className="w-full h-auto border-2 border-black -skew-y-6 translate-y-6"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Local Video with relative positioning for dynamic height */}
          {showVideo && (
            <motion.div
              key="videoWrapper"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut" },
              }}
              exit={{
                opacity: 0,
                transition: { ease: "easeInOut", duration: 1 },
              }}
              className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 1, ease: "easeInOut" },
                }}
                className="py-7 text-center md:text-7xl xl:text-9xl text-galactic-complementaryOrange font-[Special-Elite]"
              >
                Anime Event Discovery
              </motion.h2>
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 1, ease: "easeInOut" },
                }}
                className="flex w-full justify-center items-center m-4 mb-20 border-4 rounded"
              >
                <video
                  src="/videos/heroVideo.mp4"
                  autoPlay
                  muted
                  className="w-full h-[450px] object-cover"
                  onEnded={handleVideoEnd}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative pb-20 flex flex-col md:flex-row justify-between md:space-x-4">
        <div className="flex-1 px-12 md:px-16 lg:px-24 text-center relative overflow-hidden">
          <motion.h3
            className="relative z-10 mt-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-galactic-complementaryYellow to-galactic-deepElectricPurple text-3xl md:text-5xl xl:text-6xl leading-snug animate-pulse"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            "Join the Anime Community Near You"
          </motion.h3>

          <motion.p
            className="relative z-10 mt-4 text-base md:text-lg xl:text-xl leading-8 text-galactic-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Discover exciting upcoming anime events, connect with fellow fans,
            and stay informed about the latest anime happenings.
          </motion.p>

          <div className="mt-10 px-4 md:px-6 xl:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              <Button
                text="Browse Upcoming Events"
                outlineColor="bg-galactic-deepCyanGreen"
                bgColor="bg-galactic-softLavender/50"
                onClick={() => router.push("/events/upcomingEvents")}
                className="transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-gradient-to-r from-galactic-complementaryOrange to-galactic-softLavender/70 shadow-lg hover:shadow-[0_0_25px_rgba(255,165,0,0.7)] pulse-on-hover"
              />
            </motion.div>
          </div>
        </div>

        <div className="flex-1 md:w-1/2">
          <div className="border-b-2 border-cyan-600 mb-8 w-2/3 pb-1">
            <h3 className="text-galactic-text text-4xl font-black">
              Upcoming Events
            </h3>
            <div className="border-2 border-cyan-600"></div>
          </div>
          <UpcomingEvents events={upcomingEventsData} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
