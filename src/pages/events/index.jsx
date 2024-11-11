import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Link from "next/link";
import VerticalTabs from "../../components/shared/sidebarNav";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import eventTipList from "@/utils/eventTipList";
import SpringModal from "@/components/shared/springModal";
import { useMediaQuery } from "react-responsive";
import HorizontalBar from "@/components/shared/horizontalBar";
import MobileBar from "@/components/shared/mobileBar";

const Header = () => {
  const backgroundImage = "/images/heroImage6.jpg";
  return (
    <div className="relative">
      <div
        className="bg-cover bg-no-repeat h-[30vh] md:h-[40vh] "
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* NavBar with Dropdown */}
        <div className="absolute top-0 left-0 right-0 z-50">
          <NavBar />
        </div>

        {/* Header Text */}
        <div className="flex justify-center items-end pb-8 h-full bg-black/40">
          <h1 className="text-center text-6xl lg:text-9xl text-galactic-secondary font-[Poppins-bold]">
            Events
          </h1>
        </div>
      </div>
    </div>
  );
};

const EventInfoSection = () => {
  const image = "/images/eventHeaderImage.webp";
 
  return (
    <section className="md:m-10 md:mt-20 shadow-2xl">
      <div
        className="relative flex justify-center items-center bg-cover bg-no-repeat py-10"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 md:px-20 md:py-44">
          <h3 className="text-4xl pt-10 md:pt-0 text-center md:text-6xl lg:text-8xl font-[Poppins-Bold] tracking-wider text-galactic-secondary">
            Experience the Best in <br /> Anime Events
          </h3>
          <div className="bg-slate-800/65 rounded-badge mt-8 text-white font-bold text-sm p-4 md:text-base lg:text-xl lg:w-2/3 pt-10 font-[Poppins-Bold]  text-center flex flex-col gap-6 mx-auto">
            <p className="leading-5">
              Welcome to the Event Section of Anime Event Discovery! Whether
              you&apos;re gearing up for your next anime convention or just
              exploring what’s happening in the anime world near you, you’re in
              the right place.
            </p>
            <p className="leading-5">
              Here, you’ll find a carefully curated list of upcoming events,
              including conventions, screenings, and local meetups, all designed
              to bring anime fans together for unforgettable experiences.
              Navigating is simple: browse by event type, date, or location to
              find something that matches your interests. We update our listings
              regularly, so check back often to stay in the loop. Get ready to
              dive into the excitement of the anime community—your next
              adventure awaits!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Event Guide Section

const EventGuideSection = ({ children }) => {
  return (
    <div className="flex flex-col md:block items-center md:p-16 pt-24">
      <h4 className="text-5xl pb-8  text-center md:text-6xl lg:text-8xl font-[Special-Elite] text-galactic-secondary">
        Event Section Guide
      </h4>
      <ul className="grid grid-cols-1 gap-6 gap-y-14 p-4 xl:p-16 sm:grid-cols-2 lg:grid-cols-4">
        {children}
      </ul>
    </div>
  );
};

//Tip Card Component
const EventTipCard = ({ tip }) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = tip.icon;

  const handleCardClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <motion.div
        className="flex flex-col max-w-56 gap-4 p-4 bg-galactic-darkGray rounded-lg shadow-lg items-center cursor-pointer"
        whileHover={{ scale: 1.1, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={handleCardClick}
      >
        <div className="bg-galactic-accent w-24 h-24 rounded-full flex items-center justify-center mb-3">
          <IconComponent className="w-12 h-12 text-galactic-primary" />
        </div>
        <h5 className="text-galactic-text text-xl tracking-wider font-[Poppins] text-center">
          {tip.title}
        </h5>
        <p className="text-galactic-text text-sm tracking-wider font-[Poppins] text-center">
          {tip.description}
        </p>
      </motion.div>

      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={tip}
        buttonText="Understood!"
      />
    </>
  );
};

const SubmitEventSection = () => {
  const image = "/images/bleach.jpg";

  return (
    <section className="isolate overflow-hidden px-6 lg:px-8">
      <div className="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
        <figure className="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
          <div className="relative col-span-2 lg:col-start-1 lg:row-start-2">
            <h3 className="text-6xl text-galactic-text font-[Special-Elite] pb-10">
              Submit An Event
            </h3>
            <blockquote className="text-xl font-semibold leading-8 text-galactic-text sm:text-2xl sm:leading-9">
              <p>
                Commodo amet fugiat excepteur sunt qui ea elit cupidatat ullamco
                consectetur ipsum elit consequat. Elit sunt proident ea nulla ad
                nulla dolore ad pariatur tempor non. Sint veniam minim et ea.
              </p>
            </blockquote>
          </div>
          <div className="col-end-1 w-16 lg:row-span-4 lg:w-72">
            <Image
              alt="call to action photo"
              src={image}
              width={400}
              height={400}
              className="rounded-xl w-full bg-indigo-50 lg:rounded-3xl"
            />
          </div>
          <figcaption className="text-base text-galactic-text lg:col-start-1 lg:row-start-3">
            <Link href="/events/submitOrganizerForm">Submit an Event</Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

//Event Page Component

const EventPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 525px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  const menuItems = [
    { name: "Events", href: "/events" },
    { name: "Search Events", href: "/events/searchEvents" },
    { name: "Upcoming Events", href: "/events/upcomingEvents" },
    { name: "Popular Events", href: "/events/popularEvents" },
    { name: "Event Ratings", href: "/events/ratings" },
    { name: "Whats New ", href: "/events/whatsNew" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering on the server-side, avoiding hydration mismatch
    return null;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <main>
        <div className="flex flex-col lg:flex-row  bg-slate-900">
          {isMobile ? (
            <MobileBar menuItems={menuItems} />
          ) : isTablet ? (
            <HorizontalBar menuItems={menuItems} />
          ) : (
            <VerticalTabs menuItems={menuItems} />
          )}
          <div className="w-full">
            <EventInfoSection />
            <EventGuideSection>
              {eventTipList.map((tip) => {
                return <EventTipCard key={tip.id} tip={tip} />;
              })}
            </EventGuideSection>
            <SubmitEventSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
