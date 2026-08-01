import Navbar from "@/components/Navbar";
import { CBAboutMentoring } from "@/components/CBAboutMentoring";
import { CBCta } from "@/components/CBCta";
import { CBFooter } from "@/components/CBFooter";

const MentoringPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <CBAboutMentoring />
    <CBCta />
    <CBFooter />
  </div>
);

export default MentoringPage;
