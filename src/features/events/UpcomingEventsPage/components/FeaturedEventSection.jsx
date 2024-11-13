//FeaturedEventSection
import Image from "next/image";


const FeaturedEventSection = () => {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4">Featured Event</h2>
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg p-6 flex flex-col md:flex-row items-center">
          <Image
            alt="image"
            width={400}
            height={400}
            src="/images/bleach.jpg"
            className="w-full md:w-1/3 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h3 className="text-2xl font-bold mb-2">Comic Market</h3>
            <p className="mb-4 font-bold">The world's largest dōjinshi fair.</p>
            <button
              onClick={() => {
                console.log("clicked");
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default FeaturedEventSection