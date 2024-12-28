import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const currentHasira = [
  "Tengen Uzui",
  "Giyuu Tomioka",
  "Kyoujurou Rengoku",
  "Mitsuri Kanroji",
  "Muichirou Tokitou",
  "Shinobu Kocho",
  "Sanemi Shinazugawa",
  "Gyoumei Himejima",
  "Obanai Iguro",
  
];

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const DropDownList = ({list}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="w-80"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center border-none rounded-xl px-5 py-2 cursor-pointer w-full text-left mb-2 justify-between bg-gray-600"
      >
        Demon Slayer Hasira
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
          className=""
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" fill="bg-white" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05,
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3,
            },
          },
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="flex flex-col gap-3 bg-slate-50 p-4"
      >
        {list?.map((listItem, index) => (
          <motion.li
            variants={itemVariants}
            key={index}
            whileHover={{ scale: 1.2, x: 50 }}
            className=" text-purple-700 font-semibold font-sans hover:cursor-pointer"
          >
            <Link href={`/profile/${encodeURIComponent(hasira)}`}>
              {hasira}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default DropDownList;
