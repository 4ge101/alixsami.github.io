import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

// --- Fluid 2D Canvas Background ---
const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, vX: 0, vY: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    interface IParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      update: () => void;
      draw: () => void;
    }

    const particles: IParticle[] = [];
    const particleCount = 40; // Reduced further for Phase 2

    const resize = () => {
      // Phase 2: Force DPR 1 for background to ensure maximum speed on Chromium
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    class Particle implements IParticle {
      x: number; y: number; size: number; speedX: number; speedY: number; color: string;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = "rgba(224, 94, 40, " + (0.1 + Math.random() * 0.1).toFixed(2) + ")";
      }
      update() {
        this.x += this.speedX + mouse.current.vX * 0.05;
        this.y += this.speedY + mouse.current.vY * 0.05;

        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }
      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.vX = mouse.current.x - mouse.current.lastX;
      mouse.current.vY = mouse.current.y - mouse.current.lastY;
      mouse.current.lastX = mouse.current.x;
      mouse.current.lastY = mouse.current.y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let isInView = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const render = () => {
      if (!isInView) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = "rgba(2, 2, 2, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      mouse.current.vX *= 0.9;
      mouse.current.vY *= 0.9;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50" style={{ willChange: "transform" }} />;
};

// Tech tooltips for each letter with position
const techTooltips: Record<number, { title: string; items: string[]; position: 'left' | 'top' | 'bottom' | 'right' }> = {
  0: { // S
    title: "Systems Design",
    items: ["Scalability", "Load Balancing", "Caching", "Architecture"],
    position: "left"
  },
  1: { // A
    title: "AI Services",
    items: ["LLM", "Embeddings & RAG", "Model inference APIs", "ML pipelines", "Vector Databases", "LangChain", "LlamaIndex"],
    position: "bottom"
  },
  2: { // M
    title: "Massively Scalable APIs",
    items: ["REST", "GraphQL", "gRPC", "WebSockets", "API Gateways", "Rate Limiting", "Authentication & Authorization"],
    position: "top"
  },
  3: { // I
    title: "Infrastructure",
    items: ["Cloud", "Containers", "CI/CD", "Monitoring", "Observability", "Security"],
    position: "bottom"
  }
};

// Position styles for tooltips
const getTooltipPosition = (position: 'left' | 'top' | 'bottom' | 'right') => {
  switch (position) {
    case 'left':
      return {
        className: "right-full mr-8 top-1/2 -translate-y-1/2",
        connectorClass: "left-full ml-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-[#e05e28] to-transparent"
      };
    case 'top':
      return {
        className: "bottom-full mb-8 left-1/2 -translate-x-1/2",
        connectorClass: "top-full mt-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-[#e05e28] to-transparent"
      };
    case 'bottom':
      return {
        className: "top-full mt-8 left-1/2 -translate-x-1/2",
        connectorClass: "bottom-full mb-0 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-t from-[#e05e28] to-transparent"
      };
    case 'right':
      return {
        className: "left-full ml-8 top-1/2 -translate-y-1/2",
        connectorClass: "right-full mr-0 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-l from-[#e05e28] to-transparent"
      };
  }
};

// --- Kinetic Letter Component with Tooltip ---
const KineticLetter = ({ char, index }: { char: string; index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 10 });
  const springY = useSpring(y, { stiffness: 100, damping: 10 });
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltip = techTooltips[index];
  const positionStyles = tooltip ? getTooltipPosition(tooltip.position) : null;

  const handleMouseMove = (e: React.MouseEvent) => {
    // Avoid calculations if cursor is too far (simple bounding box check first)
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dX = e.clientX - centerX;
    const dY = e.clientY - centerY;

    // Performance: Fast distance check before hypot
    if (Math.abs(dX) > 200 || Math.abs(dY) > 200) {
      x.set(0);
      y.set(0);
      return;
    }

    const dist = Math.sqrt(dX * dX + dY * dY);

    if (dist < 200) {
      const angle = Math.atan2(dY, dX);
      const force = (200 - dist) / 5;
      x.set(Math.cos(angle) * force);
      y.set(Math.sin(angle) * force);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseEnter = () => {
    if (tooltip) setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setShowTooltip(false);
  };

  return (
    <motion.span
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        display: "inline-block",
        willChange: "transform",
        transform: "translate3d(0,0,0)" // Force hardware acceleration
      }}
      className="cursor-default select-none hover:text-[#e05e28] transition-colors duration-500 relative"
    >
      {char}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && tooltip && positionStyles && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 pointer-events-none hidden md:block ${positionStyles.className}`}
            style={{ width: "280px" }}
          >
            {/* Connector Line */}
            <div className={`absolute ${positionStyles.connectorClass}`} />

            {/* Tooltip Card */}
            <div className="relative bg-black/95 backdrop-blur-xl border border-[#e05e28]/30 rounded-lg p-4 shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#e05e28]/5 rounded-lg blur-xl" />

              {/* Content */}
              <div className="relative">
                {/* Title */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#e05e28]/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e05e28] animate-pulse" />
                  <h4 className="text-[#e05e28] font-mono text-xs font-bold uppercase tracking-wider">
                    {tooltip.title}
                  </h4>
                </div>

                {/* Items */}
                <div className="space-y-1.5">
                  {tooltip.items.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 text-white/70 text-xs font-mono"
                    >
                      <div className="w-1 h-1 rounded-full bg-[#e05e28]/50" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-[#e05e28]/50 rounded-tl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-[#e05e28]/50 rounded-br" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.span>
  );
};

const Hero = () => {
  const title = "SAMI";
  const subtitle = "SOftware Architect";

  return (
    <section id="home" className="relative h-screen bg-[#020202] overflow-x-hidden flex items-center justify-center font-display">

      {/* Fluid Background Layer */}
      <FluidBackground />

      {/* Kinetic Typography Layer */}
      <div className="relative z-10 flex flex-col items-center select-none pointer-events-auto">

        {/* Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 md:gap-4 mb-8 md:mb-12"
        >
          <div className="w-4 md:w-8 h-[1px] bg-[#e05e28]" />
          <span className="text-[8px] md:text-[10px] font-mono text-[#e05e28] tracking-[0.5em] md:tracking-[1em] uppercase">
            Software Developer
          </span>
          <div className="w-4 md:w-8 h-[1px] bg-[#e05e28]" />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-[17vw] sm:text-[10rem] md:text-[22rem] font-black leading-none flex mix-blend-difference"
        >
          {title.split("").map((char, i) => (
            <KineticLetter key={i} char={char} index={i} />
          ))}
        </motion.h1>

        {/* Subtitle with Scramble Effect */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="mt-4 flex flex-col items-center"
        >
          <div className="text-[12px] md:text-[14px] font-mono text-white/40 tracking-[1.5em] uppercase text-center ml-[1.5em]">
            {subtitle}
          </div>

        </motion.div>
      </div>

      {/* Brutalist HUD Elements */}
      <div className="absolute top-24 left-6 md:top-12 md:left-12 font-mono text-[8px] md:text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#e05e28] animate-pulse" />
          <span>Status: Optimal</span>
        </div>
        <div className="hidden md:block">User_Origin: 0x77...89</div>
        <div className="hidden md:block">Design_Type: Kinetic_DOM</div>
      </div>

      <div className="absolute bottom-12 right-12 text-right font-mono text-[9px] text-white/20 uppercase tracking-widest">
        <div>Scroll to Explore</div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-12 w-[1px] bg-gradient-to-b from-[#e05e28] to-transparent mt-4 mx-auto mr-0"
        />
      </div>

      {/* Corner Decorative Lines */}
      <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 border-l border-t border-white/5 m-6 md:m-12 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 border-r border-b border-white/5 m-6 md:m-12 pointer-events-none" />

    </section>
  );
};

export default Hero;
