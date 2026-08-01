import type { FlightPlanId } from "./flightPlans";

interface Mentor {
  name: string;
  detail: string;
  plans: FlightPlanId[];
  photo: string;
}

export const mentors: Mentor[] = [
  {
    name: "Marco Rossi",
    detail: "Bocconi · Investment Banking",
    plans: ["takeoff", "summit"],
    photo: "https://i.pravatar.cc/300?img=12",
  },
  {
    name: "Giulia Bianchi",
    detail: "LUISS · Consulenza strategica",
    plans: ["layover", "summit"],
    photo: "https://i.pravatar.cc/300?img=32",
  },
  {
    name: "Luca Ferrari",
    detail: "Politecnico di Milano · Private Equity",
    plans: ["altitude", "summit"],
    photo: "https://i.pravatar.cc/300?img=51",
  },
  {
    name: "Sara Conti",
    detail: "Cattolica · Asset Management",
    plans: ["takeoff", "altitude"],
    photo: "https://i.pravatar.cc/300?img=47",
  },
  {
    name: "Alessandro Greco",
    detail: "Sapienza · Global Markets",
    plans: ["layover", "altitude"],
    photo: "https://i.pravatar.cc/300?img=14",
  },
  {
    name: "Chiara Villa",
    detail: "Bocconi · M&A Advisory",
    plans: ["takeoff", "layover", "summit"],
    photo: "https://i.pravatar.cc/300?img=45",
  },
];
