import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative px-5 md:px-8">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[radial-gradient(circle,rgba(224,94,40,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Heading — prevent overflow on small screens */}
        <h2
          ref={headingRef}
          className="font-display font-black mb-8 leading-[0.9] tracking-tighter"
          style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)" }}
        >
          Let's Build<br />
          <span className="text-gradient">Something Great</span>
        </h2>

        <div ref={contentRef}>
          <p className="text-muted-foreground text-base md:text-xl font-body mb-10 md:mb-12 max-w-xl mx-auto">
            I'm currently available for freelance work and full-time positions.
            Let's discuss how I can help bring your vision to life.
          </p>

          <MagneticButton strength={0.4}>
            <a
              href="mailto:contact@AlixSami.com"
              className="inline-block px-8 md:px-12 py-4 md:py-5 font-display font-bold text-base md:text-lg tracking-wider bg-primary text-primary-foreground rounded-full hover:shadow-[0_0_40px_hsl(36_100%_55%/0.3)] transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10">contact@AlixSami</span>
              <span className="absolute inset-0 bg-foreground transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-display font-bold text-base md:text-lg">
                contact@AlixSami
              </span>
            </a>
          </MagneticButton>

          <div className="flex items-center justify-center gap-6 md:gap-8 mt-10 md:mt-12 flex-wrap">
            {[
              { label: "GitHub", href: "https://github.com/4ge101" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/sami-ali-548272319/" },
              { label: "X (Twitter)", href: "https://x.com/sami72982704" },
            ].map(({ label, href }) => (
              <MagneticButton key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-line text-muted-foreground hover:text-foreground text-sm font-body transition-colors duration-300 py-2"
                  data-cursor-hover
                >
                  {label}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 md:mt-32 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="text-muted-foreground text-sm font-body">
          © {new Date().getFullYear()} — Ali Sami
        </span>
        <span className="text-muted-foreground text-sm font-body">
          Full-Stack Software Developer
        </span>
      </div>
    </section>
  );
};

export default Contact;