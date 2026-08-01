import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { CBAboutUs } from "@/components/CBAboutUs";
import { CBOurServices } from "@/components/CBOurServices";
import { CBFounders } from "@/components/CBFounders";
import { CBMethodology } from "@/components/CBMethodology";
import { CBCta } from "@/components/CBCta";
import { CBContact } from "@/components/CBContact";
import { CBFooter } from "@/components/CBFooter";
import BookingPopup from "@/components/BookingPopup";
import PathwaysOverlay from "@/components/PathwaysOverlay";

const Index = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPathwaysOpen, setIsPathwaysOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CBAboutUs />
      <CBOurServices />
      <CBFounders />
      <CBMethodology />
      <CBContact />
      <CBFooter />
      <BookingPopup
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      <PathwaysOverlay
        isOpen={isPathwaysOpen}
        onClose={() => setIsPathwaysOpen(false)}
      />
    </div>
  );
};

export default Index;
