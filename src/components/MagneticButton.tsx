import { useRef, type ReactNode } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
}

const MagneticButton = ({ children, strength = 0.3 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrap"
    >
      {children}
    </div>
  );
};

export default MagneticButton;
