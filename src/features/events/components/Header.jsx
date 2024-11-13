import NavBar from "@/shared/components/NavBar/NavBar";

const Header = () => {
    const backgroundImage = "/images/heroImage6.jpg";
    return (
      <div className="relative">
        <div
          className="bg-cover bg-no-repeat h-[30vh] md:h-[40vh] "
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* NavBar with Dropdown */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <NavBar />
          </div>
  
          {/* Header Text */}
          <div className="flex justify-center items-end pb-8 h-full bg-black/40">
            <h1 className="text-center text-6xl lg:text-9xl text-galactic-secondary font-[Poppins-bold]">
              Events
            </h1>
          </div>
        </div>
      </div>
    );
  };

  export default Header