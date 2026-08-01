import { type MarqueeItem } from "@/components/LogoMarquee";

// University logos
import lseLogo from "@/assets/logos/universities/lse.svg";
import polimiLogo from "@/assets/logos/universities/polimi.png";
import mitLogo from "@/assets/logos/universities/mit.png";
import edhecLogo from "@/assets/logos/universities/edhec.jpg";
import lbsLogo from "@/assets/logos/universities/lbs.jpg";
import unigeLogo from "@/assets/logos/universities/unige.png";
import ethLogo from "@/assets/logos/universities/eth.jpg";
import baruchLogo from "@/assets/logos/universities/baruch.jpeg";
import skemaLogo from "@/assets/logos/universities/skema.webp";
import novaLogo from "@/assets/logos/universities/nova.png";
import hultLogo from "@/assets/logos/universities/hult.png";
import loughboroughLogo from "@/assets/logos/universities/loughborough.jpg";
import epflLogo from "@/assets/logos/universities/epfl.png";
import hecLogo from "@/assets/logos/universities/hec.png";

// Company logos
import goldmanSachsLogo from "@/assets/logos/companies/goldmansachs.svg";
import pwcLogo from "@/assets/logos/companies/pwc.svg";
import accentureLogo from "@/assets/logos/companies/accenture.svg";

export const universities: MarqueeItem[] = [
  { name: "London Business School", logo: lbsLogo, logoWhite: "/logos-white/lbs.png" },
  { name: "Loughborough University", logo: loughboroughLogo, logoWhite: "/logos-white/loughborough.png" },
  { name: "Imperial College London", logo: "/lovable-uploads/abd9e3ae-445f-4395-a161-828d261180d5.png", logoWhite: "/logos-white/imperial.png" },
  { name: "Warwick", logo: "/lovable-uploads/f5bab727-0e8d-4e85-b4a0-e2265c940b44.png", logoWhite: "/logos-white/warwick.png" },
  { name: "LSE", logo: lseLogo, logoWhite: "/logos-white/lse.png" },
  { name: "UCL", logo: "/lovable-uploads/a3a65cce-920d-4d5f-a07f-3852e670f218.png", logoWhite: "/logos-white/ucl.png" },
  { name: "King's College London", logo: "/lovable-uploads/b092105d-cd93-4fe9-8a46-8c6aae273974.png", logoWhite: "/logos-white/kings.png" },
  { name: "Bocconi", logo: "/lovable-uploads/ac9db681-a9c1-4b64-aeb6-c8349e12d4df.png", logoWhite: "/logos-white/bocconi.png" },
  { name: "Humanitas", logo: "/lovable-uploads/3820be9d-62de-4f91-8bdf-806f1be0820b.png", logoWhite: "/logos-white/humanitas.png" },
  { name: "UniMi", logo: "/lovable-uploads/614e3783-d6e4-469c-a29a-44cd6a675e9b.png", logoWhite: "/logos-white/unimi.png" },
  { name: "Università Cattolica", logo: "/lovable-uploads/798f4836-a405-432f-b30e-85c641b9ddc2.png", logoWhite: "/logos-white/cattolica.png" },
  { name: "San Raffaele", logo: "/lovable-uploads/ee39ba56-571f-4487-b062-e7f47c86049e.png", logoWhite: "/logos-white/sanraffaele.png" },
  { name: "LUISS", logo: "/lovable-uploads/9a20adc4-2949-49ac-a0fe-5f62cd672130.png", logoWhite: "/logos-white/luiss.png" },
  { name: "IULM", logo: "/lovable-uploads/c8c5c1eb-3377-44e2-80e1-92e93d45cff7.png", logoWhite: "/logos-white/iulm.png" },
  { name: "Politecnico di Milano", logo: polimiLogo, logoWhite: "/logos-white/polimi.png" },
  { name: "EDHEC", logo: edhecLogo, logoWhite: "/logos-white/edhec.png" },
  { name: "HEC", logo: hecLogo, logoWhite: "/logos-white/hec.png" },
  { name: "ESCP", logo: "/lovable-uploads/706f1c02-68e6-4c43-b7e7-382f5c0fcf21.png", logoWhite: "/logos-white/escp.png" },
  { name: "Skema Business School", logo: skemaLogo, logoWhite: "/logos-white/skema.png" },
  { name: "Université de Genève", logo: unigeLogo, logoWhite: "/logos-white/unige.png" },
  { name: "EPFL", logo: epflLogo, logoWhite: "/logos-white/epfl.png" },
  { name: "ETH Zurich", logo: ethLogo, logoWhite: "/logos-white/eth.png" },
  { name: "Nova SBE", logo: novaLogo, logoWhite: "/logos-white/nova.png" },
  { name: "IE University", logo: "/lovable-uploads/b558e760-c4fe-473d-b617-4647543162e1.png", logoWhite: "/logos-white/ie.png" },
  { name: "ESADE", logo: "/lovable-uploads/64c45b20-1abb-43f9-9f99-537984a912a2.png", logoWhite: "/logos-white/esade.png" },
  { name: "WU Vienna", logo: "/lovable-uploads/2809747a-dd60-4e44-a797-e638fce59f33.png", logoWhite: "/logos-white/wuvienna.png" },
  { name: "Maastricht University", logo: "/lovable-uploads/88eb200b-2525-474e-a7ca-0d2382920415.png", logoWhite: "/logos-white/maastricht.png" },
  { name: "MIT", logo: mitLogo, logoWhite: "/logos-white/mit.png" },
  { name: "Baruch College", logo: baruchLogo, logoWhite: "/logos-white/baruch.png" },
  { name: "Hult", logo: hultLogo, logoWhite: "/logos-white/hult.png" },
  { name: "Columbia University", logo: "/lovable-uploads/6fe4258c-5bbd-4350-8985-fcf5f750d073.png", logoWhite: "/logos-white/columbia.png" },
  { name: "Lehigh University", logo: "/lovable-uploads/51a0b707-e10d-42a8-9151-51942690bb3a.png", logoWhite: "/logos-white/lehigh.png" },
];

export const companies: MarqueeItem[] = [
  { name: "Accenture", logo: accentureLogo, logoWhite: "/logos-white/accenture.png" },
  { name: "Andera Partners", logo: "/lovable-uploads/fe4f3718-b953-4b1b-abb9-3d991c4aad68.png", logoWhite: "/logos-white/andera.png" },
  { name: "Ardian", logo: "/lovable-uploads/f35ff84b-aa23-4215-bdb6-b2eee981d19d.png", logoWhite: "/logos-white/ardian.png" },
  { name: "Azimut", logo: "/lovable-uploads/5baf4fda-9830-4a0a-8051-373b6a4cf586.png", logoWhite: "/logos-white/azimut.png" },
  { name: "Bain & Company", logo: "/lovable-uploads/0e4975bf-4377-465f-ac09-5e6b919b9492.png", logoWhite: "/logos-white/bain.png" },
  { name: "Black Oak Monaco", logo: "/lovable-uploads/ca13f012-ed00-43a0-8106-766f6826c2e6.png", logoWhite: "/logos-white/blackoak.png" },
  { name: "Cyrus Capital", logo: "/lovable-uploads/6a530717-c46d-4b95-acbf-7d7d2d879d9a.png", logoWhite: "/logos-white/cyrus.png" },
  { name: "DE Shaw & Co", logo: "/lovable-uploads/711ef473-ffa9-4c45-9fbf-7375292f5889.png", logoWhite: "/logos-white/deshaw.png" },
  { name: "Deloitte", logo: "/lovable-uploads/749dcf02-c577-4215-be87-6b1e1ea18e2c.png", logoWhite: "/logos-white/deloitte.png" },
  { name: "Dentons", logo: "/lovable-uploads/d0937013-337a-4fc7-b5b0-0ed692a9dadb.png", logoWhite: "/logos-white/dentons.png" },
  { name: "Deutsche Bank", logo: "/lovable-uploads/ee500a74-0f1e-4668-bd42-42fbd52b3c46.png", logoWhite: "/logos-white/deutschebank.png" },
  { name: "Dräger", logo: "/lovable-uploads/c2528802-824c-44cf-868b-06697a4dd855.png", logoWhite: "/logos-white/drager.png" },
  { name: "DVR Capital", logo: "/lovable-uploads/6a7bd8cf-b25d-4d0a-9d5c-f949972f8f88.png", logoWhite: "/logos-white/dvr.png" },
  { name: "Euronext", logo: "/lovable-uploads/383aefac-0f37-4026-b4f8-6bce926dc51c.png", logoWhite: "/logos-white/euronext.png" },
  { name: "EY", logo: "/lovable-uploads/817ea876-77fb-474c-b52c-c24d873a209f.png", logoWhite: "/logos-white/ey.png" },
  { name: "Fante Group", logo: "/lovable-uploads/76b9c35d-0d2f-444d-bfef-2d028fe12736.png", logoWhite: "/logos-white/fante.png" },
  { name: "Forbes", logo: "/lovable-uploads/a848eac2-b8a2-4a11-9006-2f91a63c3b7f.png", logoWhite: "/logos-white/forbes.png" },
  { name: "Goldman Sachs", logo: goldmanSachsLogo, logoWhite: "/logos-white/goldmansachs.png" },
  { name: "J.P. Morgan", logo: "/lovable-uploads/3fd97059-2d60-4b9e-b3c2-4168cbac9e0c.png", logoWhite: "/logos-white/jpmorgan.png" },
  { name: "L'Oréal", logo: "/lovable-uploads/4315887b-4575-423d-b3e1-a7942c40413a.png", logoWhite: "/logos-white/loreal.png" },
  { name: "LVMH", logo: "/lovable-uploads/bf21715d-4049-4f6c-877a-3a3308f2e60e.png", logoWhite: "/logos-white/lvmh.png" },
  { name: "Morgan Stanley", logo: "/lovable-uploads/7aa27155-e749-461b-8b98-8a5a76908240.png", logoWhite: "/logos-white/morganstanley.png" },
  { name: "Penkhas", logo: "/lovable-uploads/7b2f42d4-26bb-419b-9f78-a4c25c8fa570.png", logoWhite: "/logos-white/penkhas.png" },
  { name: "PwC", logo: pwcLogo, logoWhite: "/logos-white/pwc.png" },
  { name: "Raymond James", logo: "/lovable-uploads/97b0a7bc-a22e-4509-8c1e-7297c70fa63a.png", logoWhite: "/logos-white/raymondjames.png" },
  { name: "Rothschild & Co", logo: "/lovable-uploads/6f258e84-ca20-498a-8bd3-5dfdb3e63bc5.png", logoWhite: "/logos-white/rothschild.png" },
  { name: "The European House – Ambrosetti", logo: "/lovable-uploads/0dd53baf-05cf-4090-adf7-606e522feeeb.png", logoWhite: "/logos-white/ambrosetti.png" },
  { name: "Yard Reaas", logo: "/lovable-uploads/72cef745-3049-4379-b8e2-6b3a2a34fd45.png", logoWhite: "/logos-white/yardreaas.png" },
];
