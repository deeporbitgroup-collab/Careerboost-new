import Navbar from "@/components/Navbar";
import { CBAboutTalentPool } from "@/components/CBAboutTalentPool";
import { CBCta } from "@/components/CBCta";
import { CBFooter } from "@/components/CBFooter";

const TalentPoolAboutPage = () => (
  <div className="min-h-screen">
    <Navbar />
    <CBAboutTalentPool />
    <CBCta />
    <CBFooter />
  </div>
);

export default TalentPoolAboutPage;
