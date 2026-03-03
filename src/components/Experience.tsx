import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [

  {
    period: "2023 — 2026",
    role: "Full-Stack Developer",
    company: "Independent Projects",
    description:
      "Architecting modern full-stack applications and system-level solutions. Specializing in performance, scalability, and clean architecture across web and Linux environments.",
    tech: ["JavaScript", "TypeScript", "React", "Github", "Rust"],
    type: "Independent",
  },
  {
    period: "2025 — 2026",
    role: "Software Developer",
    company: "WebAgency Akesha.",
    description:
      "Delivered 2+ client projects across e-commerce",
    tech: ["React", "Node.js", "MongoDB", "GraphQL", "AWS"],
    type: "Independent",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      // 3D Card Stack Effect - only animate when in view
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(card,
          {
            scale: isMobile ? 0.95 : 0.85,
            opacity: 0,
            y: isMobile ? 30 : 50,
            rotateX: isMobile ? 2 : 5,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: isMobile ? "top bottom-=20" : "top bottom-=100",
              end: "top center",
              scrub: isMobile ? 0.5 : 1,
              toggleActions: "play pause resume pause",
            },
            scale: 1,
            opacity: 1,
            y: 0,
            rotateX: 0,
            ease: "none", // Linear is faster for scrub
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding bg-background relative overflow-x-hidden">
      <div className="max-w-4xl mx-auto relative z-10 px-4 md:px-6">

        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <h2 className="text-[12vw] sm:text-[4rem] md:text-[6rem] font-black font-display tracking-tight leading-none mb-4 text-center">
            EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        {/* 3D Cards Container */}
        <div className="flex flex-col gap-10 md:gap-32 perspective-[1000px]">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group relative transform-style-3d will-change-transform"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative bg-card/40 backdrop-blur-xl border border-white/10 p-5 md:p-12 rounded-3xl overflow-hidden hover:translate-y-[-5px] transition-all duration-500 shadow-2xl group-hover:border-primary/30">
                {/* Mobile-only subtle accent border */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/50 to-transparent md:hidden" />

                <div className="flex flex-col md:flex-row justify-between items-start gap-2 md:gap-6 mb-4 md:mb-6">
                  <div>
                    <h3 className="text-lg md:text-3xl font-bold font-display text-primary mb-1 md:mb-2 leading-tight tracking-tight">{exp.role}</h3>
                    <p className="text-sm md:text-xl font-medium text-foreground/90">{exp.company}</p>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-2 flex-wrap">
                    <span className="text-[9px] md:text-sm font-mono text-muted-foreground bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/5 whitespace-nowrap">{exp.period}</span>
                    <span className="text-[9px] md:text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded-full border border-primary/20 whitespace-nowrap">{exp.type}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed text-[13px] md:text-lg mb-6 md:mb-8 font-body">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-2.5 md:px-4 py-1.5 md:py-2 text-[9px] md:text-sm font-bold bg-white/5 text-foreground/70 rounded-lg border border-white/5 shadow-sm hover:border-primary/50 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
