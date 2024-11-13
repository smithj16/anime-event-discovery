//FeaturedSection 
import FeaturedItem from "./FeaturedItem";
import ButtonCarousel from "@/shared/buttonCarousel";
import { useMediaQuery } from "react-responsive";
import { featuredEventsData } from "@/utils/popularEventsData";

const BREAKPOINTS = {
    sm: 640,
    lg: 1024,
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

  export default FeaturedSection