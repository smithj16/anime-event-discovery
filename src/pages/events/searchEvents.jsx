import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import VerticalTabs from "@/components/shared/sidebarNav";
import { useMediaQuery } from "react-responsive";
import HorizontalBar from "@/components/shared/horizontalBar";
import MobileBar from "@/components/shared/mobileBar";
import AnimeSearchInput from "@/components/UI/BeamInput";
import { VanishText } from "@/components/UI/VanishingText";
import SearchEventCard from "@/components/UI/SearchEventCard";
import { popularEventsCardData } from "@/utils/popularEventsData";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvent } from "@/store/slices/eventSlice";

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

const SearchEventSection = () => {
  const dispatch = useDispatch();
  const eventState = useSelector((state) => state.event);
  const { status, eventItem, error } = eventState;

  const handleSearch = (searchTerm) => {
    dispatch(fetchEvent(searchTerm));
    console.log(eventItem);
  };

  const isEventItemEmpty = Object.keys(eventItem).length === 0;

  const image = "/images/animeCity.jpg";
  const phraseWords = [
    "Conventions",
    "Restaurants",
    "Live Music",
    "Watch Parties",
    "Gaming",
  ];

  return (
    <div className="md:m-10 md:mt-20 shadow-2xl">
      <div
        className="relative flex items-center  bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 md:px-20 py-40">
          <VanishText
            phraseWords={phraseWords}
            sentence="Search for these type of events"
          />
          <div className="pt-28">
            <AnimeSearchInput onSearch={handleSearch} />
            <div className="my-12">
              {status === "loading" && <p>Loading...</p>}
              {status === "failed" && <p>Error: {error}</p>}
              {isEventItemEmpty ? (
                <p className="text-5xl">Search for event</p>
              ) : (
                <SearchEventCard event={eventItem} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchResultGrid = ({ searchData }) => {
  const [visibleCount, setVisibleCount] = useState(5); // Initially show 5 cards
  const [expanded, setExpanded] = useState(false);

  // Handle show more functionality
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Show 5 more cards
    if (visibleCount + 5 >= searchData.length) {
      setExpanded(true); // Check if all cards are shown, to switch to "Show Less"
    }
  };

  // Handle show less functionality
  const handleShowLess = () => {
    setVisibleCount(5); // Reset to show only 5 cards
    setExpanded(false); // Mark that we're back to the default collapsed state
  };

  // Conditionally render "Show More" or "Show Less" button
  const renderButton = () => {
    if (expanded) {
      return (
        <button
          onClick={handleShowLess}
          className="mt-4 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Show Less
        </button>
      );
    } else if (searchData.length > visibleCount) {
      return (
        <button
          onClick={handleShowMore}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Show More
        </button>
      );
    }
    return null;
  };

  if (searchData === null) {
    return (
      <div className="text-5xl p-12 h-96 flex items-center justify-center">
        Click Search for Result
      </div>
    );
  } else if (searchData === undefined) {
    return (
      <div className="text-5xl p-12 h-96 flex items-center justify-center">
        No Search Found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {searchData.slice(0, visibleCount).map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <SearchEventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Conditionally render "Show More" or "Show Less" */}
      <div className="text-center">{renderButton()}</div>
    </div>
  );
};

const SearchEventsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 525px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });
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
            <SearchEventSection />
            {/* <SearchResultGrid searchData={popularEventsCardData} /> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchEventsPage;
