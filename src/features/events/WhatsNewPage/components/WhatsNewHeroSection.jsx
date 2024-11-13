//WhatsNewHero
import FeaturedSection from "./FeaturedSection";

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

  export default HeroSection;