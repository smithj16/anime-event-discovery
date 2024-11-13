const HeroSection = () => {
    return (
      <header className="bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 text-white py-20 rounded-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Anime Event Discovery</h1>
          <p className="text-xl mb-8">
            Discover the most exciting anime conventions across the web!
          </p>
          <div className="bg-black bg-opacity-50 p-6 rounded-lg inline-block">
            <h2 className="text-2xl font-semibold mb-2">
              Next Event: Anime Japan
            </h2>
            <p className="text-xl font-bold">The event is here! </p>
          </div>
        </div>
      </header>
    );
  };


  export default HeroSection;