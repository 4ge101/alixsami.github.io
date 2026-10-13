import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Copy } from "lucide-react";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const installCommands = {
  "Windows": "irm https://alixsami.com/install.ps1 | iex",
  "Linux / macOS": "curl -fsSL https://alixsami.com/install.sh | bash",
};

const Contact = () => {
  const [os, setOs] = useState<keyof typeof installCommands>("Linux / macOS");
  const [copied, setCopied] = useState(false);
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

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommands[os]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

          <div className="mt-16 md:mt-20 max-w-xl mx-auto text-left">
            <p className="text-muted-foreground text-xs md:text-sm font-mono uppercase tracking-widest mb-4 text-center">
              Prefer the terminal?
            </p>
            <div className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[var(--shadow-glow)]">
              <div className="flex items-center gap-4 border-b border-border px-3 md:px-4">
                <div className="hidden sm:flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                </div>
                <div className="flex flex-1">
                  {(Object.keys(installCommands) as (keyof typeof installCommands)[]).map((name) => (
                    <button
                      key={name}
                      onClick={() => setOs(name)}
                      className={`px-3 py-3 text-xs font-mono transition-colors duration-300 border-b-2 ${
                        os === name
                          ? "text-primary border-primary"
                          : "text-muted-foreground border-transparent hover:text-foreground"
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={copyCommand}
                  className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
                >
                  {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
              <div className="px-4 py-5 overflow-x-auto space-y-2 font-mono text-xs md:text-sm whitespace-nowrap">
                <p className="text-muted-foreground"># one command, that's it</p>
                <p className="text-foreground">
                  <span className="text-primary select-none">$ </span>
                  {installCommands[os]}
                  <span className="inline-block w-2 h-4 ml-1 align-middle bg-primary animate-pulse" />
                </p>
              </div>
            </div>
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