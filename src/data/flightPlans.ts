export const flightPlans = [
  {
    id: "takeoff",
    name: "Takeoff",
    tagline: "Supporto dall'istruzione secondaria all'università",
    description:
      "Ti guidiamo nella scelta del percorso universitario giusto, dalla candidatura ai test d'ingresso.",
  },
  {
    id: "layover",
    name: "Layover",
    tagline: "Guida per trasferimenti universitari",
    description:
      "Supporto per chi vuole cambiare ateneo o corso di laurea, in Italia o all'estero.",
  },
  {
    id: "altitude",
    name: "Altitude",
    tagline: "Opportunità di tirocinio professionale",
    description:
      "Ti prepariamo e connettiamo con le aziende partner per il tuo primo tirocinio in settori competitivi.",
  },
  {
    id: "summit",
    name: "Summit",
    tagline: "Transizione dall'università ai master",
    description:
      "Ti accompagniamo nella scelta e nella candidatura ai migliori master in Italia e all'estero.",
  },
] as const;

export type FlightPlanId = (typeof flightPlans)[number]["id"];
