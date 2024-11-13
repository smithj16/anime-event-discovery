//RenderEventCard 
import renderEventCard from "./renderEventCard";

const renderSection = (title, icon, description, events, isMobile) => {

    return (
      <div className="my-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-galactic-primary flex items-center">
              {icon}
              <span className="ml-2">{title}</span>
            </h2>
            <p className="text-galactic-text mt-1">{description}</p>
          </div>
          <a href="#" className="text-galactic-accent hover:underline">
            See All &rarr;
          </a>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => renderEventCard(event))}
        </div>
      </div>
    );
  };

  export default renderSection;