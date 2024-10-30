import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import VerticalTabs from "@/components/shared/sidebarNav";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Image } from "@/components/shared/image";
import { IoLocationSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import StaggeredDropDown from "@/components/shared/staggeredDropdown";
import MobileBar from "@/components/shared/mobileBar";
import HorizontalBar from "@/components/shared/horizontalBar";
import formatDate from "@/utils/dateFormatter";
import { popularEventsData } from "@/utils/popularEventsData";
import {
  Heart,
  Calendar,
  MapPin,
  Users,
  Star,
  X,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";

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

const HeroSection = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20 rounded-xl">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Anime Event Discovery</h1>
        <p className="text-xl mb-8">
          Discover the most exciting anime conventions across the web!
        </p>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg inline-block">
          <h2 className="text-2xl font-semibold mb-2">
            Next Event: Anime Japan
          </h2>
          <p className="text-xl font-bold">The event is here! </p>
        </div>
      </div>
    </header>
  );
};

const FeaturedEventSection = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Featured Event</h2>
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg p-6 flex flex-col md:flex-row items-center">
        <Image
          alt="image"
          src="/images/bleach.jpg"
          className="w-full md:w-1/3 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
        />
        <div>
          <h3 className="text-2xl font-bold mb-2">Comic Market</h3>
          <p className="mb-4 font-bold">The world's largest dōjinshi fair.</p>
          <button
            onClick={() => {
              console.log("clicked");
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const FeaturedEventCard = ({ event }) => {
  const date = formatDate(event.date, "format4");
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };
  const [favorites, setFavorites] = useState([]);

  return (
    <motion.div
      key={event.id}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg overflow-hidden"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.2 }}
    >
      <Image
        src={event.images?.card}
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
        <div className="flex items-center mb-2">
          <Calendar className="w-4 h-4 mr-2 text-purple-400" />
          <span>{date.toLocaleString()}</span>
        </div>
        <div className="flex items-center mb-2 font-semibold">
          <MapPin className="w-4 h-4 mr-2 text-purple-400" />
          <span>{`${event.location?.city} ${event.location?.state}`}</span>
        </div>
        <div className="flex items-center mb-2">
          <Users className="w-4 h-4 mr-2 text-purple-400" />
          <span>{event.attendees.toLocaleString()} attendees</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {event.categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-purple-700 text-white text-xs font-semibold rounded-full"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => toggleFavorite(event.id)}
            className="flex items-center"
            aria-label={
              favorites.includes(event.id)
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            <Heart
              className={`w-5 h-5 mr-1 ${
                favorites.includes(event.id)
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400"
              }`}
            />
            <span>{event.likes.toLocaleString()}</span>
          </button>
          <button
            onClick={() => console.log(event)}
            className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FilteredEventsSection = ({ events }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const locations = [
    "Current Location",
    "Illinois",
    "Indiana",
    "Texas",
    "Florida",
    "California",
    "Wisconsin",
  ];
  const categories = [
    "Cosplay",
    "Panels",
    "Merchandise",
    "Gaming",
    "Convention",
    "Art",
    "Cultural",
    "Festival",
    "Music",
    "Gathering",
    "Dance",
    "Film",
    "Screening",
    "Panel",
    "Workshops",
    "Outdoor",
    "Technology",
    "Exhibition",
    "Interactive",
    "Concert",
    "Virtual",
  ];

  const generateOptions = (items, icon) =>
    items.map((text) => ({ text, icon }));

  const filteredByDateOptions = generateOptions(months, MdCalendarMonth);
  const filteredByLocationOptions = generateOptions(locations, IoLocationSharp);
  const filteredByCategoriesOptions = generateOptions(
    categories,
    BiSolidCategoryAlt
  );

  return (
    <div className="px-10">
      <div className="flex flex-wrap gap-4 mb-8">
        <StaggeredDropDown
          buttonText="Filter by date"
          options={filteredByDateOptions}
        />
        <StaggeredDropDown
          buttonText="Filter by location"
          options={filteredByLocationOptions}
        />
        <StaggeredDropDown
          buttonText="Filter by categories"
          options={filteredByCategoriesOptions}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => {
          return FeaturedEventCard({ event });
        })}
      </div>
    </div>
  );
};

const UpcomingEventsPage = () => {
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
    <div className="flex flex-col bg-galactic-background">
      <Header />
      <main className=" py-8">
        <div className="flex flex-col lg:flex-row">
          {isMobile ? (
            <MobileBar menuItems={menuItems} />
          ) : isTablet ? (
            <HorizontalBar menuItems={menuItems} />
          ) : (
            <VerticalTabs menuItems={menuItems} />
          )}
          <div className="w-full">
            <div className="px-8"> 

            <HeroSection />
            </div>
            <FeaturedEventSection />
            <FilteredEventsSection events={popularEventsData} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpcomingEventsPage;
