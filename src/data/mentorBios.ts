// Short "who they are / what they do" line for each curated mentor (see
// curatedMentors.ts for the id roster), sourced from their public LinkedIn
// profile (and, where LinkedIn itself couldn't be scraped, corroborating
// public sources — company team pages, alumni features). Kept separate from
// Supabase because this is editorial copy, not user-editable profile data.
//
// Compiled August 2026. Not every mentor has a confirmed public bio (common
// names, private profiles, no confident match) — those ids are simply
// omitted here, and the UI falls back to sector/university in that case.
// Re-verify before reusing if this file is more than a few months old.
export const MENTOR_BIOS: Record<string, string> = {
  "d07354c3-d356-4589-b88d-34af01eb0659": // Adam Aslam
    "Founder and Managing Partner of UniPoint Partners, an independent advisory boutique, with investment banking experience across Europe.",
  "38948a46-bef9-4097-88ac-6fb950b51983": // Alejandro Fernandez Hortal
    "Works at Deutsche Bank in London with a corporate banking background, having studied at London Business School and Universitat Pompeu Fabra.",
  "d4bad5a3-f4aa-4c34-bbdb-e6b18f21b7fb": // Alessandro Olivetti
    "Incoming analyst in BlackRock's 2026 Graduate Programme, following internships at J.P. Morgan and McKinsey, studying at SKEMA Business School.",
  "80fe19ad-bd96-4316-b6f0-5c8f064f7a04": // Andrea Alivernini
    "Venture Capital Analyst at Innovis VC and Venture Scout at Flashpoint, focused on early-stage startups; ESCP Business School.",
  "b6234538-5532-4d7f-bd4d-2c593969fe2d": // Antoine Falch
    "Investment Banking Leveraged Finance Analyst at J.P. Morgan, holding a Master in Finance from ESCP Business School.",
  "5cfebc7f-546e-4c3e-8712-fa801727b8d7": // Armand Passillier
    "Investment Banking Summer Analyst in Debt Capital Markets at Crédit Agricole CIB, now pursuing an MSc in Finance at ESCP.",
  "1f9d9258-8f96-4871-9782-5c4912c7e288": // Arturo Alaimo
    "Credit Analyst at 9fin, covering European high-yield fixed income markets, with a background from Heriot-Watt University.",
  "c3ed7637-bee3-4b0a-ae5b-bde26c45f70e": // Ben Preece
    "Incoming Investments Summer Analyst at Schroders, studying Economics & Management at the University of St Andrews.",
  "7d9518aa-6221-4c26-9f4b-9bc982ef6326": // Elisabetta Fabris
    "Regional Representative (Italy & Iberia) at AmplifyME, and Economics and Finance student at Bocconi with Global Markets experience.",
  "c8e64191-c5a7-482c-bbe9-55641245817e": // Gianluca De Goyzueta
    "Strategy Intern, Banking & Digital Services at Accenture, and Finance student at ESCP Business School with prior investment banking internship experience.",
  "235c91e9-491e-4c84-b244-bb9b0c9f688d": // Gregorio Fassio
    "Final-year Corporate Finance student at ESCP Business School and part of the founding team at Louverdi, an early-stage startup.",
  "f995d43f-0f58-4c47-b55c-ffba4767dd9c": // Kitty Farrell
    "Investment Banking Summer Analyst at Goldman Sachs in London, University of Birmingham student with prior internship experience at Rothschild & Co.",
  "4da5d163-209e-41d0-a80c-0f8cc8335942": // Leone Fassio
    "Credit Risk Summer Intern at JPMorgan Chase's Commercial & Investment Bank in London, ESCP Business School student.",
  "d48d57da-7552-4987-bd5c-7c1bf7817614": // Livia Segatori
    "Works on the Credit Derivatives Trading Desk at Intesa Sanpaolo (IMI CIB), member of Bocconi Students Women in Finance.",
  "2f1803c9-cb68-479b-ad25-1fcf3cfd0e18": // Lorenzo Fruttero
    "Associate at Argo, focused on financial markets, after studying Economics and Finance at Bocconi University.",
  "b3d7dd18-1286-4e9f-bcd3-7430ea9b79ad": // Louis Ashford
    "BSc Economics student at LSE with experience through EY's Spring early-insight consulting programme.",
  "d3c0e2ce-1ccc-4317-b09c-7e0db8f2dcc5": // Luca Tissone
    "MiM graduate of ESCP Business School with professional experience at Agicap and Accenture in consulting and fintech.",
  "12a629f9-4504-4844-9f2c-208aef10daeb": // Paolo Arnanno
    "M&A and Corporate Finance professional at Deloitte, alumnus of Università Cattolica del Sacro Cuore.",
  "a074a3a1-4146-4a99-a5a2-bc6328605139": // Riccardo Rubolino
    "Bocconi–Fudan Double Degree student in International Management.",
  "7a67b6b3-5fc4-4eb0-b659-fc6f34137034": // Riccardo Ciardelli
    "Works at Obsidian Capital SGR, an Italian private markets asset manager, with a background at ESCP Business School.",
  "b9d11191-2580-4d36-8881-ff64dab85d8c": // Sergi De Francisco
    "Investment Banking Summer Analyst at PJT Partners in London, ESADE alumnus.",
  "6addf5e4-c787-4e7e-82b7-81024bd6c8fb": // Thibaud Van Landuyt
    "Investment Banking Off-Cycle Analyst at Macquarie Group, ESCP Business School Master in Finance student, prior Citi corporate banking internship.",
};
