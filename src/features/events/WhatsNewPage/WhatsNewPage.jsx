//WhatsNewPage
import HeroSection from "./components/WhatsNewHeroSection";
import EventMapSection from "./components/EventMapSection";
import EventPageLayout from "../components/EventPageLayout";

const WhatsNewPage = () => {
  return (
    <EventPageLayout styles="h-full">
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
    </EventPageLayout>
  );
};

export default WhatsNewPage;
