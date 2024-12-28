// pages/_app.js
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { wrapper } from "../store";
import "../styles/globals.css";

// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

//ease: [0.22, 1, 0.36, 1]

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={router.pathname}>
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );
};

export default wrapper.withRedux(MyApp);
