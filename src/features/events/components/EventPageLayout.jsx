import MobileBar from "./mobileBar";
import HorizontalBar from "./horizontalBar";
import VerticalTabs from "./sidebarNav";
import Footer from "@/shared/components/Footer/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { menuItems } from "../hooks/menuItems";

const EventPageLayout = ({ children, styles }) => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 525px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Prevent rendering on the server-side, avoiding hydration mismatch
    return null;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row  bg-slate-900">
        {isMobile ? (
          <MobileBar menuItems={menuItems} />
        ) : isTablet ? (
          <HorizontalBar menuItems={menuItems} />
        ) : (
          <VerticalTabs menuItems={menuItems} />
        )}
        <div className={`w-full ${styles}`}>
        {typeof children === 'function' ? children({ isMobile, isTablet }) : children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPageLayout;