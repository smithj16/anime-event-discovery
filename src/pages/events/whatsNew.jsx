"use-client";

import Footer from "@/src/components/footer/Footer";
import { useState, useEffect } from "react";
import NavBar from "@/src/components/navBar/NavBar";
import VerticalTabs from "@/src/components/shared/sidebarNav";
import MapComponent from "@/src/components/UI/MapComponent";
import {
  popularEventsCardData,
  featuredEventsData,
} from "@/src/utils/popularEventsData";
import { Image } from "@/src/components/shared/image";
import { motion } from "framer-motion";
import FilterTabs from "@/src/components/shared/filterTabs";
import CharacterWithMessage from "@/src/components/UI/AnimeCharacterMessager";
import Carousel from "@/src/components/shared/carousel";
import dateFormatter from "@/src/utils/dateFormatter";

const CharacterMessageStyles = {
  
};

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

const CARD_WIDTH = 350;
const MARGIN = 20;
const CARD_SIZE = CARD_WIDTH + MARGIN;
const cardStyles = {
  width: CARD_WIDTH,
  marginRight: MARGIN,
  container:
    "text-galactic-secondary relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1 p-4 rounded-md bg-galactic-lightGray/70",
};

const Header = () => {
  const backgroundImage = "/images/heroImage6.jpg";
  return (
    <div
      className="bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div>
        <NavBar />
        <h2 className="pl-12 lg:text-9xl text-galactic-secondary lg:py-28 font-[Poppins-bold] bg-black/40">
          Events
        </h2>
      </div>
    </div>
  );
};

const FeaturedItem = ({ images, date, name, description, style }) => {
  const formattedDate = dateFormatter(date, "format3");

  return (
    <div className={style?.container} style={style}>
      <Image
        src={images?.logo}
        className="mb-3 h-[200px] w-full rounded-lg object-cover"
        alt={`An image for a fake blog post titled ${name}`}
      />
      <span className="mb-2 rounded-md border-[1px] border-neutral-500 px-1.5 py-1 text-xs uppercase ">
        {formattedDate}
      </span>
      <h4 className="my-1.5 text-lg font-medium">{name}</h4>
      <p className="text-sm">{description}</p>
    </div>
  );
};

const FeaturedSection = () => {
  const carouselStyles = {
    section: "bg-cosmic-4 rounded-badge drop-shadow-lg p-8",
    title: "mb-8 text-4xl text-galactic-primary",
  };

  return (
    <div>
      <h3 className="pl-8 text-6xl tracking-wider font-[Special-Elite] mb-8 text-galactic-complementaryYellow">
        Featured Content
      </h3>
      <Carousel
        breakpoints={BREAKPOINTS}
        cardSize={CARD_SIZE}
        posts={featuredEventsData}
        title="Enjoy Some Highlighted Content"
        styles={carouselStyles}
      >
        {featuredEventsData.map((item) => {
          return <FeaturedItem key={item.id} style={cardStyles} {...item} />;
        })}
      </Carousel>
    </div>
  );
};

const HeroSection = () => {
  const backgroundImage = "/images/whatsNewbg.png";

  return (
    <section
      className="relative bg-cover bg-center m-12 rounded-badge overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <h1 className="text-4xl my-6 sm:text-5xl lg:text-6xl font-extrabold text-white text-center">
          What's New in the Anime World
        </h1>
        {/* Description */}
        <p className="my-10 text-xl lg:text-2xl text-gray-200 text-center max-w-3xl mx-auto">
          Discover the latest anime events happening around the globe. Filter by
          category to find events that match your interests and explore new
          experiences.
        </p>
        <FeaturedSection />
      </div>
    </section>
  );
};

const EventMapSection = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState(popularEventsCardData);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const mapContainerStyle = {
    width: "100%",
    height: "600px",
    borderRadius: "15px",
    overflow: "hidden",
  };

  // Extract unique categories
  const categoriesSet = new Set();
  popularEventsCardData.forEach((event) => {
    event.categories.forEach((category) => {
      categoriesSet.add(category);
    });
  });
  const categories = Array.from(categoriesSet);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
          // Handle error or set default location
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle lack of support
    }
  }, []);

  // Effect to filter events based on the selected category.
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredEvents(popularEventsCardData);
    } else {
      const filtered = popularEventsCardData.filter((event) =>
        event.categories.includes(selectedCategory)
      );
      setFilteredEvents(filtered);
    }
  }, [selectedCategory]);

  // Function to handle closing the character message
  const handleCloseMessage = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="mt-12 flex flex-col lg:flex-row items-center justify-around">
      {/* Map Section */}
      <div className="relative w-full lg:w-3/5">
        {/* Filter Section */}
        <div className="absolute z-30 left-2 top-12">
          <FilterTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <MapComponent
          events={filteredEvents}
          userLocation={userLocation}
          mapContainerStyle={mapContainerStyle}
          setSelectedEvent={setSelectedEvent}
        />
      </div>

      {/* Anime Character with Message */}
      <div className="w-full flex justify-around lg:w-1/3 mt-8 lg:mt-0">
        <CharacterWithMessage
          imageSrc="/images/slideShowCharacters/elsword.png"
          event={selectedEvent}
          onClose={handleCloseMessage}
          styles={CharacterMessageStyles}
        />
      </div>
    </div>
  );
};

const WhatsNewPage = () => {
  const menuItems = [
    { name: "Events", href: "/events" },
    { name: "Search Events", href: "/events/searchEvents" },
    { name: "Upcoming Events", href: "/events/upcomingEvents" },
    { name: "Popular Events", href: "/events/popularEvents" },
    { name: "Event Ratings", href: "/events/ratings" },
    { name: "Whats New ", href: "/events/whatsNew" },
  ];

  return (
    <div className="flex flex-col">
      <Header />
      <main>
        <div className="flex flex-row bg-slate-900">
          <VerticalTabs menuItems={menuItems} />
          <div className="h-full w-full">
            <HeroSection />
            <div className="m-20">
              <h2 className="text-3xl py-4 font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-8 text-galactic-softCyanGreen">
                Find Events Near You
              </h2>
              <div className="p-10 rounded-badge bg-cosmic-4 shadow-2xl">
                <h3 className="text-5xl tracking-tighter font-bold  my-5 text-galactic-primary drop-shadow-2xl">
                  Event Map
                </h3>
                <p className="text-xl font-semibold tracking-wider font-mono text-galactic-primary py-4">
                  Discover anime events in your area
                </p>
                <EventMapSection />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsNewPage;
