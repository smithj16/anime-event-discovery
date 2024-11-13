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

  
  export default EventGuideSection;