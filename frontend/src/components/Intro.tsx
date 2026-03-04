import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Intro = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLSpanElement>(null);
    const rightRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const ringsRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    // Initialize based on screen width to prevent mobile flicker
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth >= 768;
        }
        return true;
    });

    const scrollAccumulator = useRef(0);
    const isAnimating = useRef(false);

    useEffect(() => {
        if (!isVisible) return;

        // Force scroll to top and lock everything
        window.scrollTo(0, 0);
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
        document.body.style.height = "100%";

        // Stop Lenis if it exists
        (window as any).lenis?.stop();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ paused: true });

            // Epic slow-motion zoom with portal effect
            tl.to(leftRef.current, {
                x: "-150vw",
                y: "-30vh",
                opacity: 0,
                rotation: -45,
                scale: 0.3,
                filter: "blur(50px)",
                duration: 3.5,
                ease: "power4.inOut",
            }, 0)
                .to(rightRef.current, {
                    x: "150vw",
                    y: "30vh",
                    opacity: 0,
                    rotation: 45,
                    scale: 0.3,
                    filter: "blur(50px)",
                    duration: 3.5,
                    ease: "power4.inOut",
                }, 0)
                .to(textRef.current, {
                    scale: 80,
                    opacity: 0,
                    filter: "blur(120px)",
                    rotationY: 180,
                    duration: 4,
                    ease: "expo.inOut",
                }, 0)
                .to(subtitleRef.current, {
                    scale: 80,
                    opacity: 0,
                    filter: "blur(120px)",
                    y: "-50vh",
                    duration: 4,
                    ease: "expo.inOut",
                }, 0)
                .to(glowRef.current, {
                    scale: 100,
                    opacity: 0,
                    filter: "blur(200px)",
                    duration: 4,
                    ease: "expo.inOut",
                }, 0)
                .to(portalRef.current, {
                    scale: 150,
                    opacity: 0,
                    rotation: 720,
                    filter: "blur(100px)",
                    duration: 4.5,
                    ease: "expo.inOut",
                }, 0)
                .to(ringsRef.current, {
                    scale: 200,
                    opacity: 0,
                    rotation: -360,
                    duration: 4,
                    ease: "expo.inOut",
                }, 0)
                .to(particlesRef.current, {
                    scale: 50,
                    opacity: 0,
                    filter: "blur(80px)",
                    duration: 3.5,
                    ease: "power4.inOut",
                }, 0)
                .to(containerRef.current, {
                    opacity: 0,
                    duration: 2,
                    ease: "power2.inOut",
                }, 2.5);

            const finishIntro = () => {
                if (isAnimating.current) return;
                isAnimating.current = true;

                gsap.to(containerRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        setIsVisible(false);
                        document.documentElement.style.overflow = "";
                        document.body.style.overflow = "";
                        document.body.style.position = "";
                        document.body.style.width = "";
                        document.body.style.height = "";
                        (window as any).lenis?.start();
                    }
                });
            };

            // Wheel handler with SLOWER accumulation for dramatic effect
            const handleWheel = (e: WheelEvent) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (isAnimating.current) return;

                // Much slower sensitivity for cinematic feel
                scrollAccumulator.current += Math.abs(e.deltaY) * 0.0008;
                scrollAccumulator.current = Math.min(scrollAccumulator.current, 1);

                // Efficient progress update using a persistent tween or just direct progress setting with a slight lag
                // Actually, for a Cinematic feel, keeping one tween active and updating its destination is better
                gsap.to(tl, {
                    progress: scrollAccumulator.current,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto",
                    onUpdate: () => {
                        if (tl.progress() >= 0.98 && !isAnimating.current) {
                            finishIntro();
                        }
                    }
                });
            };

            // Touch handler for mobile
            let touchStartY = 0;
            const handleTouchStart = (e: TouchEvent) => {
                touchStartY = e.touches[0].clientY;
            };

            const handleTouchMove = (e: TouchEvent) => {
                e.preventDefault();
                e.stopImmediatePropagation();

                if (isAnimating.current) return;

                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;

                scrollAccumulator.current += Math.abs(deltaY) * 0.001;
                scrollAccumulator.current = Math.min(scrollAccumulator.current, 1);

                gsap.to(tl, {
                    progress: scrollAccumulator.current,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: "auto",
                    onUpdate: () => {
                        if (tl.progress() >= 0.98 && !isAnimating.current) {
                            finishIntro();
                        }
                    }
                });

                touchStartY = touchY;
            };

            // Add listeners with capture phase to intercept early
            window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
            window.addEventListener("touchstart", handleTouchStart, { passive: false, capture: true });
            window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
            window.addEventListener("scroll", (e) => e.preventDefault(), { passive: false, capture: true });

            return () => {
                window.removeEventListener("wheel", handleWheel, { capture: true });
                window.removeEventListener("touchstart", handleTouchStart, { capture: true });
                window.removeEventListener("touchmove", handleTouchMove, { capture: true });
            };
        });

        return () => {
            ctx.revert();
            document.documentElement.style.overflow = "";
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
            document.body.style.height = "";
            (window as any).lenis?.start();
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] grid place-items-center bg-black overflow-hidden m-0 p-0 w-screen h-[100dvh]"
            style={{
                touchAction: "none",
                overscrollBehavior: "none",
                WebkitOverflowScrolling: "auto",
                perspective: "1000px"
            }}
        >
            {/* Animated Portal Rings */}
            <div
                ref={ringsRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ willChange: "transform" }}
            >
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-primary/20"
                        style={{
                            width: `${(i + 1) * 200}px`,
                            height: `${(i + 1) * 200}px`,
                            animation: `spin ${20 + i * 5}s linear infinite ${i % 2 === 0 ? 'reverse' : ''}`,
                            boxShadow: `0 0 ${20 + i * 10}px rgba(224, 94, 40, 0.3)`
                        }}
                    />
                ))}
            </div>

            {/* Glowing Portal Center */}
            <div
                ref={portalRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ willChange: "transform" }}
            >
                <div
                    className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/30 via-primary/10 to-transparent"
                    style={{
                        animation: "pulse 3s ease-in-out infinite",
                        filter: "blur(40px)"
                    }}
                />
            </div>

            {/* Particle Field */}
            <div
                ref={particlesRef}
                className="absolute inset-0 pointer-events-none"
                style={{ willChange: "transform" }}
            >
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`,
                            opacity: 0.3 + Math.random() * 0.4,
                            boxShadow: "0 0 10px rgba(224, 94, 40, 0.8)"
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative flex flex-col items-center justify-center w-full px-4 pointer-events-none z-10">
                <div className="flex items-center justify-center font-display font-black tracking-tighter text-white whitespace-nowrap">
                    <span
                        ref={leftRef}
                        className="text-primary text-[clamp(2rem,15vw,15rem)] inline-block mr-[2vw] select-none leading-none"
                        style={{
                            willChange: "transform",
                            textShadow: "0 0 40px rgba(224, 94, 40, 0.8), 0 0 80px rgba(224, 94, 40, 0.4)"
                        }}
                    >
                        {"</"}
                    </span>
                    <span
                        ref={textRef}
                        className="text-[clamp(1.5rem,13vw,13rem)] inline-block select-none leading-none uppercase relative"
                        style={{
                            willChange: "transform, filter",
                            textShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
                            transformStyle: "preserve-3d"
                        }}
                    >
                        Sami
                    </span>
                    <span
                        ref={rightRef}
                        className="text-primary text-[clamp(2rem,15vw,15rem)] inline-block ml-[2vw] select-none leading-none"
                        style={{
                            willChange: "transform",
                            textShadow: "0 0 40px rgba(224, 94, 40, 0.8), 0 0 80px rgba(224, 94, 40, 0.4)"
                        }}
                    >
                        {">"}
                    </span>
                </div>

                {/* Subtitle */}
                <div
                    ref={subtitleRef}
                    className="mt-8 text-[clamp(0.8rem,2vw,1.5rem)] font-mono tracking-[0.3em] uppercase text-white/60 select-none"
                    style={{
                        willChange: "transform",
                        textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
                    }}
                >
                    Software Developer
                </div>
            </div>

            {/* Central Glow Effect */}
            <div
                ref={glowRef}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ willChange: "transform" }}
            >
                <div
                    className="w-[400px] h-[400px] rounded-full bg-primary/20"
                    style={{
                        filter: "blur(100px)",
                        animation: "pulse 2s ease-in-out infinite"
                    }}
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent pointer-events-none" />

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-20">
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/50 animate-pulse">
                    Scroll to Enter
                </span>
                <div className="relative w-6 h-12 border border-white/20 rounded-full flex items-start justify-center p-2">
                    <div
                        className="w-1 h-2 bg-primary rounded-full"
                        style={{
                            animation: "scroll 2s ease-in-out infinite"
                        }}
                    />
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-20 h-20 border-l-2 border-t-2 border-primary/30 pointer-events-none" />
            <div className="absolute top-8 right-8 w-20 h-20 border-r-2 border-t-2 border-primary/30 pointer-events-none" />
            <div className="absolute bottom-8 left-8 w-20 h-20 border-l-2 border-b-2 border-primary/30 pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-20 h-20 border-r-2 border-b-2 border-primary/30 pointer-events-none" />

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-20px) translateX(10px); }
                }
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(16px); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default Intro;
