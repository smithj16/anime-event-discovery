"use-client";
import { useState } from "react";
import { Disclosure, Menu } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchBar from "../UI/NavSearchBar";
import { Image } from "../shared/image";
import Link from "next/link";
import { useSelector } from "react-redux";

const logo = "/images/logo.jpg";
const paintBrushStroke = "/images/brushStroke.png";

///NavBar Component///

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <Disclosure as="nav" className="shadow-2xl  py-2 z-20">
      <div className="mx-auto max-w-[1500px] px-1 sm:px-2 xl:px-8">
        <div className="flex h-24 justify-between">
          <div className="flex">
            <div className="flex md:hidden lg:flex flex-shrink-0 items-center xl:pr-12">
              <Image
                alt="Website Logo"
                width={100}
                height={100}
                src={logo}
                className="h-24 w-24"
              />
            </div>
            <div className="hidden text-base lg:text-lg lg:ml-6 sm:flex lg:space-x-5 xl:space-x-16 text-galactic-accent">
              {/* Updated Link Components */}
              {["Home", "Events", "News", "Profile"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="relative group inline-flex items-center border-b-2 border-transparent px-4 pt-1 font-medium duration-200  hover:text-white"
                >
                  <span className="relative px-2 z-10">{item}</span>
                  <div className="absolute flex items-center inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={paintBrushStroke}
                      alt=""
                      className="w-full h-16 "
                      fill = "true"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Search Bar */}
          <SearchBar classes="hidden md:flex items-center" />
          {/* User Icon Component */}
          <UserProfileMenu />

          <div className="mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button
              onClick={() => toggleMenu()}
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </Disclosure.Button>
          </div>
        </div>
      </div>

      <MobileNavBar isOpen={isOpen} />
    </Disclosure>
  );
}

///User Avatar Badge///

const UserProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  // const userData = user.userInfo.Account;
  // const userAvatar = `/images/avatarIcons/${userData?.avatar}.gif`;
  const userAvatar = `/images/avatarIcons/tengen.gif`;
  // console.log(userData);

  const glowingBorder = {
    initial: { borderColor: "#00f6ff", boxShadow: "0 0 10px #00f6ff" },
    animate: {
      boxShadow: [
        "0 0 10px #00f6ff",
        "0 0 20px #ff00ff",
        "0 0 30px #00f6ff",
        "0 0 40px #ff00ff",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: "easeIn",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="hidden sm:flex sm:items-center bg-galactic-deepCyanGreen/50 border sm:p-2 lg:p-4 my-1 rounded-badge"
      initial="initial"
      animate="animate"
      variants={glowingBorder}
    >
      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <div className="flex gap-1 lg:gap-3">
          <Menu.Button
            className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* <span className="absolute -inset-1.5 rounded-full" />
            <span className="sr-only">Open user menu</span> */}
            <Image
              alt=""
              width={100}
              height={100}
              src={userAvatar}
              className="h-16 w-16 rounded-full border-2 border-galactic-primary"
            />
          </Menu.Button>
          <div className="text-xs lg:text-base flex flex-col justify-center font-extrabold text-galactic-text p-2 rounded-badge">
            <span className="font-extrabold">ThatFla$hyBoi</span>
            <span className="">Joshua Smith</span>
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <Menu.Items
              as={motion.div}
              static
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border-2 border-galactic-deepLavender bg-galactic-lightGray py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`duration-200 block px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : "text-galactic-text"
                    }`}
                  >
                    Your Profile
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`duration-200 block px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : "text-galactic-text"
                    }`}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`duration-200 block px-4 py-2 text-sm ${
                      active ? "bg-gray-100" : "text-galactic-text"
                    }`}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          )}
        </AnimatePresence>
      </Menu>
    </motion.div>
  );
};

///MobileNavBar Component///

const MobileNavBar = ({ isOpen }) => {
  const user = useSelector((state) => state.user);
  // const userData = user.userInfo.Account
  // const userAvatar = `/images/avatarIcons/${userData?.avatar}.gif`;
  const userAvatar = "/images/avatarIcons/tengen.gif";

  const revealVariant = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.42, 0, 0.58, 1], // Custom easing function
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <Disclosure.Panel className="sm:hidden bg-galactic-primary border-t-2 border-b-2 ">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={revealVariant}
            key="mobile-navbar"
            className="z-50"
          >
            <div className="space-y-1 pb-3 pt-2 font-bold z-50">
              <Disclosure.Button
                as="a"
                href="/home"
                className="block duration-100 hover:border-l-4 hover:border-galactic-secondary hover:bg-gray-50 py-2 pl-3 pr-4 text-base hover:text-gray-700"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/events"
                className="block duration-100 hover:border-l-4 border-transparent py-2 pl-3 pr-4 text-base hover:border-galactic-secondary hover:bg-gray-50 hover:text-gray-700"
              >
                Events
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/news"
                className="block duration-100 hover:border-l-4 border-transparent py-2 pl-3 pr-4 text-base hover:border-galactic-secondary hover:bg-gray-50 hover:text-gray-700"
              >
                News
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="/profile"
                className="block duration-100 hover:border-l-4 border-transparent py-2 pl-3 pr-4 text-base hover:border-galactic-secondary hover:bg-gray-50 hover:text-gray-700"
              >
                Profile
              </Disclosure.Button>

              <SearchBar classes="w-2/3 pb-2 pl-2" />
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    alt=""
                    width={32}
                    height={32}
                    src={userAvatar}
                    className="h-14 w-14 rounded-full border-2 border-galactic-deepCyanGreen"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-bold text-galactic-deepCyanGreen">
                    ThatFla$hyBoi
                  </div>
                  <div className="text-sm font-medium text-galactic-text">
                    Joshua Smith
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1 font-bold">
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base duration-100 hover:border-l-4 hover:border-galactic-secondary hover:bg-gray-100 hover:text-gray-800"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base duration-100 hover:border-l-4 hover:border-galactic-secondary hover:bg-gray-100 hover:text-gray-800"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="#"
                  className="block px-4 py-2 text-base duration-100 hover:border-l-4 hover:border-galactic-secondary hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Disclosure.Panel>
  );
};


export default NavBar;