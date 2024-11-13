import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/shared/components/UI/OutLineButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchLastestNews } from "@/store/slices/newsSlice";
import { FailedApiComponent } from "@/shared/components/UI/FailedComponent";
import { useEffect } from "react";
import SkeletonCard from "@/shared/skeletonCard";

//Lastest Anime Section

const ShimmerBorderCard = ({ news }) => {
  return (
    <div className="group relative mx-auto w-full  max-w-72 xl:max-w-80 overflow-hidden rounded-lg bg-slate-800 p-0.5 transition-all duration-500 hover:scale-[1.01] hover:bg-slate-800/50">
      <div className="relative h-full z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] bg-slate-900 p-6 transition-colors duration-500 group-hover:bg-slate-800">
        <Image
          alt={news.title}
          width={400}
          height={400}
          src={news.imageUrl}
          className="h-36 w-72 rounded-[7px]"
        />
        <h4 className="relative z-10 my-4 w-full text-xl sm:text-2xl font-bold text-slate-50">
          {news.title}
        </h4>
        <p className="relative text-sm sm:text-base  z-10 text-slate-400">
          {news.description}
        </p>
        <span className="text-slate-50 text-xs mt-5">{news.source}</span>
      </div>

      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
  );
};

const LatestAnimeNewsSection = () => {
  const dispatch = useDispatch();

  const lastestNewsState = useSelector((state) => state.news);
  // const lastestNewsState = {
  //   status: "loading",
  //   lastestNewsData: [],
  //   error: null,
  // };

  useEffect(() => {
    dispatch(fetchLastestNews());
  }, [dispatch]);

  const { status, lastestNewsItems, error } = lastestNewsState;


  if (status === "loading") {
    return (
      <div className="my-32">
        <h3 className="text-galactic-complementaryOrange text-5xl xl:text-8xl text-center py-14 border-t-2 xl:mx-44">
          Lastest News
        </h3>
        <ul className="grid grid-cols-1 gap-6 p-4 xl:p-16 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} width="" />
          ))}
        </ul>
      </div>
    ); }
  // } else if (status === "failed") return (
  //   <div className="my-32">
  //     <h3 className="text-galactic-complementaryOrange text-5xl xl:text-8xl text-center py-14 border-t-2 xl:mx-44">
  //       Lastest News
  //     </h3>
  //     <FailedApiComponent/>
  //   </div>
  // );

  return (
    <div className="my-32">
      <h3 className="text-galactic-complementaryOrange text-5xl xl:text-8xl text-center py-14 border-t-2 xl:mx-44">
        Lastest News
      </h3>
      <div>
        <ul className="grid grid-cols-1 gap-6 p-4 xl:p-16 sm:grid-cols-2 lg:grid-cols-4">
          {lastestNewsItems.map((news, index) => {
            return <ShimmerBorderCard news={news} key={news.id} />;
          })}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button
            text="View all lastest news"
            outlineColor="bg-galactic-complementaryOrange"
            bgColor="bg-galactic-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default LatestAnimeNewsSection;
