
import { FailedApiComponent } from "../../../shared/components/UI/FailedComponent";
//Popular Events tablet and up
import  Features  from "@/features/home/PopularEventsSection/DisappearingScrollFeature";

const PopularEventsSection = ({popularEventsData}) => {
  

  if (!popularEventsData || popularEventsData.length === 0) {
    return FailedApiComponent();
  }

  return (
      <Features events={popularEventsData} />
  );
};

export default PopularEventsSection;
