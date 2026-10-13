import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const cursorXSetter = gsap.quickSetter(cursor, "x", "px");
    const cursorYSetter = gsap.quickSetter(cursor, "y", "px");
    const followerXSetter = gsap.quickSetter(follower, "x", "px");
    const followerYSetter = gsap.quickSetter(follower, "y", "px");

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      cursorXSetter(mouse.x);
      cursorYSetter(mouse.y);
    };

    const onTick = () => {
      const dt = 0.15;
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      followerXSetter(pos.x);
      followerYSetter(pos.y);
    };

    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    gsap.ticker.add(onTick);
    window.addEventListener("mousemove", onMouseMove);

    const interactiveElements = document.querySelectorAll("a, button, input, textarea, .hover-target");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    if (isHovering) {
      gsap.to(followerRef.current, {
        scale: 3,
        backgroundColor: "rgba(255, 255, 255, 1)",
        mixBlendMode: "difference",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    } else {
      gsap.to(followerRef.current, {
        scale: 1,
        backgroundColor: "rgba(255, 255, 255, 0)",
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          if (followerRef.current) followerRef.current.style.mixBlendMode = "normal";
        }
      });
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    }
  }, [isHovering, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999]"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998]"
      />
    </>
  );
};

export default CustomCursor;
