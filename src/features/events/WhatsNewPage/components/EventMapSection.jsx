//EventMapSection
import { useEffect,useState } from "react";
import FilterTabs from "@/shared/filterTabs";
import CharacterWithMessage from "@/shared/components/UI/AnimeCharacterMessager";
import MapComponent from "@/shared/components/UI/MapComponent";
import { popularEventsCardData } from "@/utils/popularEventsData";

const CharacterMessageStyles = {};

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
  

  export default EventMapSection;