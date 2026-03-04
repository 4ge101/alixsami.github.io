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
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(contentRef.current?.children || [], {
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
        },
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
    <section ref={sectionRef} id="contact" className="section-padding relative">
      {/* Ambient glow - Using radial gradient instead of heavy blur filter */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(224,94,40,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 ref={headingRef} className="font-display text-5xl md:text-7xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
          Let's Build<br />
          <span className="text-gradient">Something Great</span>
        </h2>

        <div ref={contentRef}>
          <p className="text-muted-foreground text-lg md:text-xl font-body mb-12 max-w-xl mx-auto">
            I'm currently available for freelance work and full-time positions.
            Let's discuss how I can help bring your vision to life.
          </p>

          <MagneticButton strength={0.4}>
            <a
              href="mailto:theforgettenone2@gmail.com"
              className="inline-block px-12 py-5 font-display font-bold text-lg tracking-wider bg-primary text-primary-foreground rounded-full hover:shadow-[0_0_40px_hsl(36_100%_55%/0.3)] transition-all duration-500 group relative overflow-hidden"
            >
              <span className="relative z-10">contact@AlixSami</span>
              <span className="absolute inset-0 bg-foreground transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-display font-bold text-lg">
                contact@AlixSami
              </span>
            </a>
          </MagneticButton>

          <div className="flex items-center justify-center gap-8 mt-12">
            <MagneticButton>
              <a
                href="https://github.com/4ge101"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line text-muted-foreground hover:text-foreground text-sm font-body transition-colors duration-300"
                data-cursor-hover
              >
                GitHub
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://www.linkedin.com/in/sami-ali-548272319/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line text-muted-foreground hover:text-foreground text-sm font-body transition-colors duration-300"
                data-cursor-hover
              >
                LinkedIn
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://x.com/sami72982704"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line text-muted-foreground hover:text-foreground text-sm font-body transition-colors duration-300"
                data-cursor-hover
              >
                X (Twitter)
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-32 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
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
