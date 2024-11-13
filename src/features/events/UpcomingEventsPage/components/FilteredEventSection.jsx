// FileredEventsSection
import StaggeredDropDown from "@/shared/staggeredDropdown";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import FeaturedEventCard from "../../components/FeaturedEventCard";
import { IoLocationSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { fetchPopularEvents } from "../../store/thunks";

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
    const dispatch = useDispatch();
  
    const popularEventsState = useSelector((state) => state.event);
    const { status, popularItems, error } = popularEventsState;
    useEffect(() => {
      dispatch(fetchPopularEvents());
    }, [dispatch]);
  
  
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
          {popularItems.map((event) => {
            return FeaturedEventCard({ event });
          })}
        </div>
      </div>
    );
  };

  export default FilteredEventsSection