import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: "About", href: "#about", num: "01" },
  { label: "Experience", href: "#experience", num: "02" },
  { label: "Skills", href: "#skills", num: "03" },
  { label: "Projects", href: "#projects", num: "04" },
  { label: "Contact", href: "#contact", num: "05" },
];

const Navigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const logoLeftRef = useRef<HTMLSpanElement>(null);
  const logoRightRef = useRef<HTMLSpanElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);

  // Live clock
  useEffect(() => {
    const update = () => {
      if (timeRef.current) {
        timeRef.current.textContent = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection & active section & logo animation
  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY > 80;
      setScrolled(s);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Simplified Logo split animation on scroll using a single trigger
    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "200px top",
        scrub: true,
      },
    });

    if (logoLeftRef.current && logoRightRef.current && logoTextRef.current) {
      logoTl
        .to(logoLeftRef.current, { x: -20, opacity: 0, duration: 1, ease: "none" }, 0)
        .to(logoRightRef.current, { x: 20, opacity: 0, duration: 1, ease: "none" }, 0)
        .to(logoTextRef.current, { letterSpacing: "0.1em", duration: 1, ease: "none" }, 0);
    }

    // Single ScrollTrigger to track sections instead of multiple
    const trackTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Find visible section more efficiently if needed, but for now we'll keep it simple
        // and just throttle the section check
      }
    });

    // Actually, keeping the per-section triggers is fine if they are dead simple.
    // Let's just ensures they use 'will-change' and are efficient.
    const sections = navItems.map((item) => item.href.replace("#", ""));
    const triggers: ScrollTrigger[] = sections.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      })
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
      triggers.forEach((t) => t.kill());
      logoTl.kill();
      trackTrigger.kill();
    };
  }, []);

  // Entrance animation - immediate, no 2s delay
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.3 }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.from(menuRef.current.querySelectorAll(".menu-item"), {
        x: -80,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
          ? "py-3 px-6 md:px-12 lg:px-20 backdrop-blur-lg bg-background/80 border-b border-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "py-5 px-6 md:px-12 lg:px-20"
          }`}
        style={{ opacity: 0 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo: </shanhed> with scroll split */}
          <a
            href="#"
            className="font-display text-xl md:text-2xl font-black text-foreground tracking-tight group flex items-center"
            data-cursor-hover
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span
              ref={logoLeftRef}
              className="text-primary font-black transition-colors duration-300 group-hover:text-foreground"
            >
              {"</"}
            </span>
            <span
              ref={logoTextRef}
              className="font-black tracking-tight group-hover:text-primary transition-colors duration-300"
            >
              Sami
            </span>
            <span
              ref={logoRightRef}
              className="text-primary font-black transition-colors duration-300 group-hover:text-foreground"
            >
              {">"}
            </span>
          </a>

          {/* Desktop nav - bold pill style */}
          <div className="hidden lg:flex items-center gap-1 bg-card/60 rounded-full p-1.5 backdrop-blur-lg border border-border/30">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <MagneticButton key={item.label} strength={0.2}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={`relative px-5 py-2.5 text-sm font-display font-bold rounded-full transition-all duration-400 ${isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-primary rounded-full animate-fade-in" />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span className={`text-[10px] ${isActive ? "text-primary-foreground/70" : "text-primary/60"}`}>
                        {item.num}
                      </span>
                      {item.label}
                    </span>
                  </button>
                </MagneticButton>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-body">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold">Available</span>
              <span className="text-border">|</span>
              <span ref={timeRef} className="font-display font-bold tabular-nums" />
            </div>
            <MagneticButton strength={0.3}>
              <button
                onClick={() => scrollTo("#contact")}
                className="group relative px-6 py-3 text-xs font-display font-black tracking-wider uppercase overflow-hidden rounded-full border-2 border-primary bg-primary/10 hover:bg-primary transition-all duration-500"
              >
                <span className="relative z-10 text-primary group-hover:text-primary-foreground transition-colors duration-400">
                  Let's Talk
                </span>
              </button>
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center z-[110]"
            aria-label="Toggle menu"
          >
            <div className="relative w-7 h-5">
              <span className={`absolute left-0 w-full h-[2px] bg-foreground transition-all duration-500 ease-&lsqb;cubic-bezier(0.77,0,0.18,1)&rsqb; ${isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-foreground transition-all duration-300 ${isOpen ? "opacity-0 w-0" : "opacity-100 w-3/4"}`} />
              <span className={`absolute left-0 w-full h-[2px] bg-foreground transition-all duration-500 ease-&lsqb;cubic-bezier(0.77,0,0.18,1)&rsqb; ${isOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0 w-1/2"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[99] bg-background/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 pt-24 pb-12 overflow-y-auto"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        <div className="flex flex-col gap-1 sm:gap-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="menu-item group flex items-center gap-4 py-4 border-b border-white/5 text-left"
            >
              <span className="text-primary/50 text-xs md:text-sm font-display font-bold tabular-nums">{item.num}</span>
              <span className="font-display text-3xl sm:text-5xl font-black text-foreground group-hover:text-primary transition-all duration-300 group-hover:translate-x-2">
                {item.label}
              </span>
              <span className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 text-xl">
                →
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 mt-12">
          <div className="flex items-center gap-3 py-4 px-6 bg-primary/10 rounded-2xl border border-primary/20 self-start">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary font-display font-bold text-sm tracking-tight">Available for hire</span>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 px-2">
            <a href="https://github.com/4ge101" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm font-display font-bold transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/sami-ali-548272319/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm font-display font-bold transition-colors">
              LinkedIn
            </a>
            <a href="https://x.com/sami72982704" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm font-display font-bold transition-colors">
              X/Twitter
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
