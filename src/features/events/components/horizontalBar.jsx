// components/HorizontalBar.js

import Link from "next/link";
import { motion } from "framer-motion";

const HorizontalBar = ({ menuItems }) => {
  return (
    <div className="w-full shadow-2xl py-4 ">
      <nav className="flex font-bold justify-center gap-6">
        {menuItems.map((item) => (
          <motion.div
            whileHover={{ backgroundColor: "#1f2937", padding: "0.5rem 1rem", borderRadius: "0.375rem" }}
            transition={{ duration: 0.3 }}
            key={item.name}
            className="text-center"
          >
            <Link
              href={item.href}
              className="text-sm tracking-wider text-white block"
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </nav>
    </div>
  );
};

export default HorizontalBar;
