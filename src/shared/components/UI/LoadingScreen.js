import { motion, AnimatePresence } from "framer-motion";

const LoadingImage = "/images/loading.jpg";

export const LoadingScreen = () => {
    return (
      <AnimatePresence>
      <motion.div
         style={{ height: "100vh", position: "relative", overflow: "hidden", perspective: 1000 }}
         initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
         animate={{
           opacity: 1,
           scale: 1,
           rotateY: 0,
           transition: { duration: 1.4, ease: "easeInOut" },
         }}
         exit={{
           opacity: 0,
           scale: 0.8,
           rotateY: -90,
           transition: { duration: 1.4, ease: "easeInOut" },
         }}
      >
        <CutoutTextLoader height="100%" background="white" imgUrl={LoadingImage} />
      </motion.div>
    </AnimatePresence>
    );
  };
  
  const CutoutTextLoader = ({
    height,
    background,
    imgUrl,
  }) => {
    return (
      <div className="relative" style={{ height }}>
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            
          }}
        />
        <div
          style={{ background }}
          className="absolute inset-0 animate-pulse z-10"
        />
        <span
          className="font-black absolute inset-14 z-20 text-center bg-clip-text text-transparent pointer-events-none"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            fontSize: "clamp(3rem, 12vw, 10rem)",
            lineHeight: 4.5,
          }}
        >
          Loading...
        </span>
      </div>
    );
  };
  
