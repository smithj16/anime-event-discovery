"use-client";
import { FailedApiComponent } from "../../../components/UI/FailedComponent";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { fetchPopularEvents } from "../../../store/slices/eventSlice";
import { useMediaQuery } from "react-responsive";

import Skeleton from "@/components/shared/skeleton";
import SkeletonCard from "@/components/shared/skeletonCard";

//Popular Events tablet and up
import  Features  from "@/pages/home/PopularEventsSection/DisappearingScrollFeature";

const PopularEventsSection = ({popularEventsData}) => {
  

  if (!popularEventsData || popularEventsData.length === 0) {
    return FailedApiComponent();
  }

  return (
      <Features events={popularEventsData} />
  );
};

export default PopularEventsSection;
