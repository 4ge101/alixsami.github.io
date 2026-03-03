import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Twitter, Linkedin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const refractionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 0.1,
      });

      // Text Color Fill Animation
      const words = textRef.current?.querySelectorAll(".word");
      if (words) {
        gsap.to(words, {
          color: "#ffffff",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=50%",
            scrub: 0.1,
          }
        });
      }

      // Refraction background letters fill - primary color
      const letters = refractionRef.current?.querySelectorAll(".letter");
      if (letters) {
        gsap.to(letters, {
          color: "rgba(224, 94, 40, 0.4)", // Primary color with opacity
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.1,
          }
        });
      }

      // Reveal Effect for Stats
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top center",
          toggleActions: "play reverse play reverse"
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const bio = "I am a creative technologist with a passion for building immersive digital experiences. I combine technical expertise with design sensibilities to create software that feels alive.";

  return (
    <section ref={sectionRef} id="about" className="relative h-screen bg-black text-white overflow-hidden will-change-transform">

      {/* Content Layer */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">

          {/* Left: Interactive/Visual Area */}
          <div className="hidden lg:flex flex-col justify-center relative pointer-events-none">
            <div
              ref={refractionRef}
              className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 text-[10rem] font-black font-display text-white/5 whitespace-nowrap select-none flex"
            >
              {"REFRACTION".split("").map((char, i) => (
                <span key={i} className="letter inline-block">
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Text Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white/20 font-mono tracking-widest uppercase text-[10px]">/About</span>
            </div>

            <p ref={textRef} className="text-2xl md:text-5xl font-display font-medium leading-tight mb-8 md:mb-12 text-white/20">
              {bio.split(" ").map((word, i) => (
                <span key={i} className="word mr-2 md:mr-3 inline-block">
                  {word}
                </span>
              ))}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 border-t border-white/10 pt-8">
              <div className="stat-item">
                <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 mb-1 md:mb-2">01+</h3>
                <p className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wider font-mono">Years Exp.</p>
              </div>
              <div className="stat-item">
                <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20 mb-1 md:mb-2">4+</h3>
                <p className="text-[10px] md:text-sm text-gray-500 uppercase tracking-wider font-mono">Projects</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-6 mt-12">
              <a href="https://github.com/4ge101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all group backdrop-blur-md bg-white/5">
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://x.com/sami72982704" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all group backdrop-blur-md bg-white/5">
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/sami-ali-548272319/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all group backdrop-blur-md bg-white/5">
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default About;
