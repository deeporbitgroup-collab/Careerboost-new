import { useState } from "react";
import { flightPlans, type FlightPlanId } from "@/data/flightPlans";
import { mentors } from "@/data/mentors";

export function CBMentoringSection() {
  const [selected, setSelected] = useState<FlightPlanId>("takeoff");

  const selectedPlan = flightPlans.find((p) => p.id === selected)!;
  const filteredMentors = mentors.filter((m) => m.plans.includes(selected));

  return (
    <section id="mentoring" className="bg-navy px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cb-glow">Mentoring</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Un mentor per ogni fase del tuo percorso
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Scegli il tuo Flight Plan: consulenza gratuita di 30 minuti, piano personalizzato e
            supporto continuativo con un mentor verificato.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {flightPlans.map((plan) => {
            const active = plan.id === selected;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`rounded-2xl border p-5 text-left transition-colors ${
                  active
                    ? "border-cb-accent bg-cb-accent/10"
                    : "border-white/10 bg-navydark hover:border-white/25"
                }`}
              >
                <span
                  className={`text-xs font-mono uppercase tracking-[0.15em] ${
                    active ? "text-cb-glow" : "text-white/40"
                  }`}
                >
                  {plan.name}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-white">{plan.tagline}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{plan.description}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-semibold text-white">
            Mentor disponibili per {selectedPlan.name}
          </h3>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.name}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-navydark p-5"
              >
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="size-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-white">{mentor.name}</p>
                  <p className="text-xs text-white/50">{mentor.detail}</p>
                  <a
                    href="#contatti"
                    className="mt-2 inline-block text-xs font-medium text-cb-glow hover:underline"
                  >
                    Prenota check-in gratuito
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
