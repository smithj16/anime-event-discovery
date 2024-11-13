const EventInfoSection = () => {
    const image = "/images/eventHeaderImage.webp";
   
    return (
      <section className="md:m-10 md:mt-20 shadow-2xl">
        <div
          className="relative flex justify-center items-center bg-cover bg-no-repeat py-10"
          style={{ backgroundImage: `url(${image})` }}
        >
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 md:px-20 md:py-44">
            <h3 className="text-4xl pt-10 md:pt-0 text-center md:text-6xl lg:text-8xl font-[Poppins-Bold] tracking-wider text-galactic-secondary">
              Experience the Best in <br /> Anime Events
            </h3>
            <div className="bg-slate-800/65 rounded-badge mt-8 text-white font-bold text-sm p-4 md:text-base lg:text-xl lg:w-2/3 pt-10 font-[Poppins-Bold]  text-center flex flex-col gap-6 mx-auto">
              <p className="leading-5">
                Welcome to the Event Section of Anime Event Discovery! Whether
                you&apos;re gearing up for your next anime convention or just
                exploring what’s happening in the anime world near you, you’re in
                the right place.
              </p>
              <p className="leading-5">
                Here, you’ll find a carefully curated list of upcoming events,
                including conventions, screenings, and local meetups, all designed
                to bring anime fans together for unforgettable experiences.
                Navigating is simple: browse by event type, date, or location to
                find something that matches your interests. We update our listings
                regularly, so check back often to stay in the loop. Get ready to
                dive into the excitement of the anime community—your next
                adventure awaits!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default EventInfoSection;