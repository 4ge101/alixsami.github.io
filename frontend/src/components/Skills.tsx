import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const specificSkills = [
  { name: "Python", category: "GENERAL PURPOSE" },
  { name: "Rust", category: "SYSTEMS LANGUAGE" },
  { name: "React", category: "FRONTEND" },
  { name: "JavaScript", category: "CORE LANGUAGE" },
  { name: "TypeScript", category: "LANGUAGE" },
  { name: "Node.js", category: "BACKEND" },
  { name: "CSS", category: "UI STYLING" },
  { name: "Linux", category: "OPERATING SYSTEMS" },
  { name: "Git", category: "VERSION CONTROL" },
  { name: "GitHub", category: "COLLABORATION PLATFORM" },
];

const Skills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let newIndex = prev + newDirection;
      if (newIndex < 0) newIndex = specificSkills.length - 1;
      if (newIndex >= specificSkills.length) newIndex = 0;
      return newIndex;
    });
  };

  const skill = specificSkills[currentIndex];

  return (
    <section id="skills" className="relative min-h-screen bg-[#020202] overflow-hidden flex items-center justify-center py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-[#020202]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#e05e2810,transparent_70%)] opacity-50" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* HUD Top Left */}
      <div className="absolute top-12 left-12 z-30 pointer-events-none">
        <span className="text-xs font-mono text-[#e05e28] tracking-widest uppercase block">// Stack</span>
        <span className="text-[10px] font-mono text-white/10 uppercase tracking-widest">
          {currentIndex + 1} / {specificSkills.length}
        </span>
      </div>

      {/* Center Guide Line */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col gap-2 z-30">
        <div className="w-1.5 h-1.5 rounded-full bg-[#e05e28]" />
        <div className="w-1 h-32 bg-gradient-to-b from-[#e05e28] to-transparent opacity-30" />
      </div>

      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-center pointer-events-none">
        <h2 className="text-9xl font-black text-white/5 uppercase italic whitespace-nowrap">STACK</h2>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl w-full px-4 h-[500px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full cursor-pointer"
            onClick={() => paginate(1)}
          >
            <div className="relative px-8 py-12 rounded-xl border border-[#e05e28]/40 bg-gradient-to-br from-[#1a1a1a]/90 to-black hover:border-[#e05e28]/60 transition-all duration-300">
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#e05e28]/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 space-y-6">
                {/* Top Label */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#e05e28]/70 tracking-widest uppercase">
                    SKILL_{currentIndex.toString().padStart(2, "0")}
                  </span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#e05e28]" />
                    <div className="w-2 h-2 rounded-full bg-[#e05e28]/60" />
                    <div className="w-2 h-2 rounded-full bg-[#e05e28]/30" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-6xl font-black text-white">{skill.name}</h3>

                {/* Category Badge */}
                <span className="inline-block text-xs font-mono text-[#e05e28] uppercase tracking-widest px-4 py-2 border border-[#e05e28]/40 rounded">
                  {skill.category}
                </span>

                {/* Divider */}
                <div className="h-px w-16 bg-gradient-to-r from-[#e05e28]/60 to-transparent" />

                {/* Description */}
                <p className="text-white/50 text-sm">0xSLAB_{currentIndex.toString().padStart(2, "0")} // DEPTH_SYNC: OK</p>

                {/* Click to continue */}
                <p className="text-[10px] font-mono text-[#e05e28]/50 mt-8">Click to continue →</p>
              </div>

              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#e05e28]/40 rounded-br-xl" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#e05e28]/20 rounded-tl-xl" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
        <motion.div
          layout
          className="h-full bg-gradient-to-r from-[#e05e28] to-transparent"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / specificSkills.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </section>
  );
};

export default Skills;