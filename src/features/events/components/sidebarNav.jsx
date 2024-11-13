import Link from "next/link";
import { motion } from "framer-motion";

const VerticalTabs = ({ menuItems }) => {
  return (
    <div className=" h-full shadow-2xl py-10 px-6 w-1/6">
      <nav className="flex flex-col items-center w-full space-y-6">
        {menuItems.map((item) => (
          <motion.div
            key={item.name}
            whileHover={{ scale: 1.05, backgroundColor: "#4A00C8", padding: "0.75rem 1.5rem", borderRadius: "0.5rem" }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="w-full"
          >
            <Link
              href={item.href}
              className="text-base font-semibold text-galactic-text  py-3 px-6 bg-galactic-lightGray rounded-md hover:bg-galactic-primary transition-all duration-300 block text-center"
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

export default VerticalTabs;

