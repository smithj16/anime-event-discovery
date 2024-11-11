"use-client";

import Footer from "@/components/Footer/Footer";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar/NavBar";
import VerticalTabs from "@/components/shared/sidebarNav";
import MapComponent from "@/components/UI/MapComponent";
import {
  popularEventsCardData,
  featuredEventsData,
} from "@/utils/popularEventsData";
import Image from "next/image";
import { motion } from "framer-motion";
import FilterTabs from "@/components/shared/filterTabs";
import CharacterWithMessage from "@/components/UI/AnimeCharacterMessager";
import ButtonCarousel from "@/components/shared/buttonCarousel";
import dateFormatter from "@/hooks/dateFormatter";
import { useMediaQuery } from "react-responsive";
import MobileBar from "@/components/shared/mobileBar";
import HorizontalBar from "@/components/shared/horizontalBar";

const CharacterMessageStyles = {};

const BREAKPOINTS = {
  sm: 640,
  lg: 1024,
};

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

const FeaturedItem = ({ images, date, name, description, style }) => {
  const formattedDate = dateFormatter(date, "format3");

  return (
    <div className={style?.container} style={style}>
      <Image
        src={images?.logo}
        width={400}
        height={400}
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
  const isMobile = useMediaQuery({ query: "(max-width: 340px)" });

  // Dynamically calculate card width based on screen size
  const CARD_WIDTH = isMobile ? 295 : 350;
  const MARGIN = 20;
  const CARD_SIZE = CARD_WIDTH + MARGIN;

  // Define card styles with dynamic width
  const cardStyles = {
    width: CARD_WIDTH,
    marginRight: MARGIN,
    container:
      "text-galactic-secondary relative shrink-0 cursor-pointer transition-transform hover:-translate-y-1 p-4 rounded-md bg-galactic-lightGray/70",
  };
  const carouselStyles = {
    section: "rounded-badge drop-shadow-lg",
    title:
      "mb-8 leading-7 text-2xl md:text-4xl font-[Poppins-bold] text-galactic-primary",
  };

  return (
    <section className="bg-cosmic-4 rounded-badge  md:p-8">
      <h3 className="pl-8 text-6xl tracking-wider font-[Special-Elite] mb-8 text-galactic-darkGray">
        Featured Content
      </h3>
      <p className="text-3xl text-galactic-darkGray">Enjoy Some Highlghted Content</p>
      <ButtonCarousel
        breakpoints={BREAKPOINTS}
        cardSize={CARD_SIZE}
        posts={featuredEventsData}
        title="Enjoy Some Highlighted Content"
        styles={carouselStyles}
      >
        {featuredEventsData.map((item) => {
          return <FeaturedItem key={item.id} style={cardStyles} {...item} />;
        })}
      </ButtonCarousel>
    </section>
  );
};

const HeroSection = () => {
  const backgroundImage = "/images/whatsNewbg.png";

  return (
    <section
      className="relative bg-cover bg-center md:m-12 rounded-badge overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto  sm:px-6 lg:px-8 py-16">
        {/* Heading */}
        <h1 className="text-4xl my-6 sm:text-5xl lg:text-6xl font-extrabold text-white text-center">
          What’s New in the Anime World
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
    <div className="md:mt-12 flex flex-col lg:flex-row items-center justify-around">
      {/* Map Section */}
      <div className="relative w-full lg:w-3/5">
        {/* Filter Section */}
        <div className="absolute z-10 left-2 top-12">
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
        <div className="flex flex-col lg:flex-row bg-slate-900">
          {isMobile ? (
            <MobileBar menuItems={menuItems} />
          ) : isTablet ? (
            <HorizontalBar menuItems={menuItems} />
          ) : (
            <VerticalTabs menuItems={menuItems} />
          )}
          <div className="h-full w-full">
            <HeroSection />
            <div className="md:m-20">
              <h2 className="text-3xl py-4 font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-8 text-galactic-softCyanGreen">
                Find Events Near You
              </h2>
              <div className="rounded-badge bg-cosmic-4 shadow-2xl">
                <div className="p-10">
                  <h3 className="text-center md:text-left text-5xl md:text-6xl lg:text-8xl tracking-tighter font-bold  my-5 text-galactic-primary drop-shadow-2xl">
                    Event Map
                  </h3>
                  <p className="text-xl lg:text-3xl leading-5 font-semibold tracking-wider  font-mono text-galactic-primary py-4">
                    Discover anime events in your area
                  </p>
                </div>
                <div className="p-4">

                <EventMapSection />
                </div>
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
