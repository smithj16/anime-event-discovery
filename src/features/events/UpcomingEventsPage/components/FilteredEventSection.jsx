import StaggeredDropDown from "@/shared/staggeredDropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FeaturedEventCard from "../../components/FeaturedEventCard";
import { IoLocationSharp } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { fetchFilteredEvents } from "../../store/thunks";

const FilteredEventsSection = () => {
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [month, setMonth] = useState("");
  const [type, setType] = useState("");

  // const clearFilters = () => {
  //   setCategory(null);
  //   setState(null);
  //   setMonth(null);
  //   setType(null);
  // };

  const token = "hardcoded-token-for-testing";
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  const states = [
    "illinois",
    "indiana",
    "texas",
    "florida",
    "california",
    "wisconsin",
  ];
  const categories = [
    "cosplay",
    "panels",
    "merchandise",
    "gaming",
    "music",
    "gathering",
    "screening",
    "food",
    "virtual",
  ];
  const types = ["convention", "restaurant", "gaming", "social"];

  const generateOptions = (items, icon) =>
    items.map((text) => ({ text, icon }));

  const filteredByDateOptions = generateOptions(months, MdCalendarMonth);
  const filteredByLocationOptions = generateOptions(states, IoLocationSharp);
  const filteredByCategoriesOptions = generateOptions(
    categories,
    BiSolidCategoryAlt
  );
  const filteredByTypeOptions = generateOptions(types, IoLocationSharp);

  const dispatch = useDispatch();
  const filteredEventData = useSelector((state) => state.event);
  const { status, filteredEvent, error } = filteredEventData;

  useEffect(() => {
    const queryParams = {
      month,
      state,
      category,
      type,
    };
    dispatch(fetchFilteredEvents(queryParams));
  }, [dispatch, month, state, category, type, token]);

  return (
    <div className="px-10">
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <div>
            <StaggeredDropDown
              buttonText="Filter by date"
              options={filteredByDateOptions}
              setFilter={setMonth}
            />
          </div>
          <div>
            <StaggeredDropDown
              buttonText="Filter by location"
              options={filteredByLocationOptions}
              setFilter={setState}
            />
          </div>
          <div>
            <StaggeredDropDown
              buttonText="Filter by categories"
              options={filteredByCategoriesOptions}
              setFilter={setCategory}
            />
          </div>
          <div>
            <StaggeredDropDown
              buttonText="Filter by types"
              options={filteredByTypeOptions}
              setFilter={setType}
            />
          </div>
        </div>
      </div>

      {/* Display Current Filters */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Current Filters:
        </h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {month && (
            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-md text-sm">
              Month: {month}
            </span>
          )}
          {state && (
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm">
              Location: {state}
            </span>
          )}
          {category && (
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm">
              Category: {category}
            </span>
          )}
          {type && (
            <span className="bg-blue-100 text-red-600 px-3 py-1 rounded-md text-sm">
              Type: {type}
            </span>
          )}
          {!month && !location && !category && (
            <span className="text-gray-500 text-sm">No filters applied.</span>
          )}
        </div>
      </div>

      {/* Events Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvent.map((event) => {
          return <FeaturedEventCard key={event._id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default FilteredEventsSection;
