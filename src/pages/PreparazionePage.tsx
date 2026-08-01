import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { CBAboutPreparazione } from "@/components/CBAboutPreparazione";
import { CBPrograms } from "@/components/CBPrograms";
import { CBServices } from "@/components/CBServices";
import { CBCta } from "@/components/CBCta";
import { CBFooter } from "@/components/CBFooter";

const PreparazionePage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <CBAboutPreparazione />
      <CBPrograms />
      <CBServices />
      <CBCta />
      <CBFooter />
    </div>
  );
};

export default PreparazionePage;
