import React, { useEffect, useRef, useState } from "react";
import { animate, useMotionTemplate, useMotionValue } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const AnimeSearchInput = ({ onSearch }) => {
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  const hue = useMotionValue(0);

  useEffect(() => {
    const animation = animate(hue, 360, {
      ease: "linear",
      duration: 10,
      repeat: Infinity,
    });
    return () => animation.stop();
  }, []);

  const background = useMotionTemplate`linear-gradient(90deg, hsl(${hue}, 100%, 70%), hsl(calc(${hue} + 60), 100%, 70%))`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex h-[100px] items-center px-4 md:pl-12">
      <form
        onSubmit={handleSubmit}
        onClick={() => inputRef.current.focus()}
        className="relative flex w-full max-w-md items-center gap-2 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5 py-1.5 pl-6 pr-1.5"
      >
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for anime events"
          className="w-full border-none bg-transparent text-sm text-white placeholder-white/80 focus:outline-none"
        />
        <button
          onClick={(e) => e.stopPropagation()}
          type="submit"
          className="group flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 px-4 py-3 text-sm font-medium text-white transition-transform active:scale-95"
        >
          <span>Search</span>
          <FaSearch className="-mr-4 opacity-0 transition-all group-hover:-mr-0 group-hover:opacity-100" />
        </button>
      </form>
    </div>
  );
};

export default AnimeSearchInput;
