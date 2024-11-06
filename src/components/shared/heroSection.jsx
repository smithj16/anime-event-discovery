// components/HeroSection.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import UpcomingEvents from "@/pages/home/HeroSection/UpcomingEvents";
import Image from "next/image";
import Button from "../UI/OutLineButton";
import { useRouter } from "next/router";

const heroImages = {
  Image1: "/images/heroImages/gojo.png",
  Image2: "/images/heroImages/bleach.png",
  Image3: "/images/heroImages/redEyeGirl.jpg",
};
const HeroSectionTwo = () => {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    // Set a 5-second delay to switch from initial UI to video
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [showVideo]);

  const handleVideoEnd = () => {
    // When the video ends, switch back to the original UI
    setShowVideo(false);
  };

  return (
    <section className="relative p-10 bg-galactic-background/90">
      {/* Dynamic Height Wrapper for animations */}
      <div className="relative w-full flex flex-col items-center justify-center">
        <AnimatePresence>
          {/* Initial UI with relative positioning for dynamic height */}
          {!showVideo && (
            <motion.div
              key="initialUI"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{
                opacity: 0,
                transition: { ease: "easeInOut" },
              }}
              className="relative w-full text-center p-12"
            >
              <h2 className="pb-6 md:text-7xl xl:text-9xl text-galactic-complementaryOrange font-[Special-Elite]">
                Anime Event Discovery
              </h2>
              <div className="flex space-x-6 mb-2 pt-6 px-6">
                <div className="flex-1">
                  <Image
                    src={heroImages?.Image1}
                    alt="heroImage"
                    width={400}
                    height={400}
                    className="w-2/3 h-auto border-2 border-black skew-y-6 -translate-y-6"
                  />
                </div>
                <div className="flex-1">
                  <Image
                    src={heroImages?.Image2}
                    alt="heroImage"
                    width={400}
                    height={400}
                    className="w-2/3 h-auto border-2 border-black -rotate-90 skew-y-3 translate-y-3"
                  />
                </div>
                <div className="flex-1">
                  <Image
                    src={heroImages?.Image3}
                    alt="heroImage"
                    width={400}
                    height={400}
                    className="w-full h-auto border-2 border-black -skew-y-6 translate-y-6"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Local Video with relative positioning for dynamic height */}
          {showVideo && (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{
                opacity: 0,
                transition: { ease: "easeInOut",  },
              }}
              className="relative w-full h-full flex justify-center items-center m-4 mb-20 border-4 rounded"
            >
              <video
                src="/videos/heroVideo.mp4"
                autoPlay
                muted
                className="w-full h-[450px] object-cover"
                onEnded={handleVideoEnd}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="pb-20 flex flex-col md:flex-row justify-between md:space-x-4">
        <div className="flex-1 px-24 text-center">
          <h3 className="mt-4 font-bold font-[Special-Elite] text-xl xl:text-5xl leading-8 text-galactic-secondary">
            &quot;Discover the Anime World <br /> Near You&quot;
          </h3>
          <p className="mt-4 font-semibold text-lg xl:text-xl leading-8 text-gray-300">
            Discover exciting upcoming anime events near you, read detailed
            reviews from fellow fans, and stay updated with the latest anime
            news and releases.
          </p>
          <div className="mt-10 px-6 xl:px-10">
            <Button
              text="View all Upcoming Event"
              outlineColor="bg-galactic-secondary"
              bgColor="bg-galactic-softLavender/50"
              onClick={() => router.push("/events/upcomingEvents")}
            />
          </div>
        </div>
        <div className="flex-1 md:w-1/2">
          <div className="border-b-2 border-cyan-600 mb-8 w-2/3 pb-1">
            <h3 className="text-galactic-text text-4xl font-black">
              Upcoming Events
            </h3>
            <div className="border-2 border-cyan-600"></div>
          </div>
          <UpcomingEvents />
        </div>
      </div>
    </section>
  );
};

export default HeroSectionTwo;
