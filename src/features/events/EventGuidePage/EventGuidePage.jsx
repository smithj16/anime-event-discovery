//Event Page Component
import EventGuideSection from "./components/EventGuideSection";
import EventInfoSection from "./components/EventInfoSection";
import EventTipCard from "./components/EventTipCard";
import SubmitEventSection from "./components/SubmitEventSection";
import eventTipList from "@/utils/eventTipList";
import EventPageLayout from "../components/EventPageLayout";

const EventGuidePage = () => {
  return (
    <EventPageLayout>
      <EventInfoSection />
      <EventGuideSection>
        {eventTipList.map((tip) => {
          return <EventTipCard key={tip.id} tip={tip} />;
        })}
      </EventGuideSection>
      <SubmitEventSection />
    </EventPageLayout>
  );
};

export default EventGuidePage;
