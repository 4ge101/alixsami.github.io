import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [

  {
    title: "Finance Dashboard",
    category: "Fintech • Data Viz",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=60&fm=webp",
    description: "Real-time analytics dashboard for cryptocurrency traders with sub-millisecond updates and predictive modeling.",
    tech: ["React", "D3.js", "WebSockets", "Go"],
    link: "#",
    github: "https://github.com/AlixShahid",
  },
  {
    title: "Social Connect",
    category: "Social • Real-time",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=60&fm=webp",
    description: "Decentralized social network focusing on privacy and content ownership with IPFS integration.",
    tech: ["Vue.js", "IPFS", "Solidity", "Node.js"],
    link: "#",
    github: "https://github.com/AlixShahid",
  },
  {
    title: "Health Tracker",
    category: "Mobile • IoT",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=60&fm=webp",
    description: "Cross-platform mobile app connected to IoT wearables for real-time health monitoring and alerts.",
    tech: ["React Native", "Firebase", "Bluetooth", "Express"],
    link: "#",
    github: "https://github.com/AlixShahid",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".project-panel");

      const mainScroll = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          start: "top top",
          end: () => "+=" + containerRef.current?.offsetWidth,
        },
      });

      // Parallax for images inside panels - coordinated with horizontal scroll
      sections.forEach((section: any) => {
        const img = section.querySelector(".project-img");
        if (img) {
          gsap.fromTo(img,
            { x: "-10%" }, // Better than scale for parallax feel
            {
              x: "10%",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "left right",
                end: "right left",
                containerAnimation: mainScroll, // Link to the horizontal animation
                scrub: true,
              }
            }
          )
        }
      })

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative bg-background overflow-hidden">

      <div ref={containerRef} className="flex flex-nowrap h-screen" style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}>

        {/* Intro Panel */}
        <div className="project-panel min-w-full h-screen flex flex-col justify-center items-center px-6 relative z-10 bg-background text-foreground text-center">
          <span className="text-primary font-display font-bold tracking-widest uppercase mb-4 text-xs md:text-sm">Selected Works</span>
          <h2 className="text-[12vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter uppercase text-center">
            Featured <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/50">Projects</span>
          </h2>
          <div className="mt-10 animate-bounce">
            <ArrowUpRight className="rotate-45 w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Project Panels */}
        {projects.map((project, i) => (
          <div key={i} className="project-panel min-w-full h-screen relative flex items-center justify-center overflow-hidden bg-background">

            {/* Background Image with Parallax */}
            <div className="absolute inset-0 opacity-40">
              <img src={project.image} alt={project.title} className="project-img w-full h-full object-cover" loading="lazy" style={{ willChange: "transform" }} />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="md:pr-12">
                <span className="text-primary font-display font-bold tracking-wider uppercase mb-2 block text-xs md:text-sm">{project.category}</span>
                <h3 className="text-3xl sm:text-5xl md:text-[6rem] leading-none font-black font-display text-white mb-3 md:mb-6 uppercase tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[13px] sm:text-base md:text-xl text-gray-300 leading-relaxed mb-5 md:mb-8 max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-10">
                  {project.tech.map(t => (
                    <span key={t} className="px-2.5 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-[9px] md:text-sm font-bold text-white border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 md:gap-6">
                  <a href={project.link} className="flex items-center gap-2 group text-white hover:text-primary transition-colors">
                    <span className="text-xs md:text-lg font-bold uppercase tracking-widest font-display">View Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <a href={project.github} className="flex items-center gap-2 group text-white hover:text-primary transition-colors">
                    <span className="text-xs md:text-lg font-bold uppercase tracking-widest font-display">Code</span>
                    <Github className="w-3.5 h-3.5 md:w-6 md:h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Decorative Number */}
              <div className="hidden lg:block text-right">
                <span className="text-[15rem] leading-none font-black font-display text-transparent text-stroke opacity-20">
                  0{i + 1}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Outro Panel */}
        <div className="project-panel min-w-full h-screen flex flex-col justify-center items-center px-10 relative z-10 bg-primary/5">
          <h2 className="text-[5vw] font-black tracking-tighter uppercase text-center mb-8">
            Want to see more?
          </h2>
          <a href="https://github.com/AlixShahid" target="_blank" rel="noopener noreferrer" className="px-12 py-6 bg-primary text-background font-bold text-xl rounded-full hover:scale-105 transition-transform uppercase tracking-wider">
            Visit Github
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
