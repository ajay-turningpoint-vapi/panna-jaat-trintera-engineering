import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function calculateGap(width) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 80;
  const maxGap = 120;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export function CircularServices({ services, autoplay = true }) {
  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const cardContainerRef = useRef(null);
  const autoplayIntervalRef = useRef(null);

  const servicesLength = useMemo(() => services.length, [services]);
  const activeService = useMemo(
    () => services[activeIndex],
    [activeIndex, services]
  );

  // Resize listener
  useEffect(() => {
    function handleResize() {
      if (cardContainerRef.current) {
        setContainerWidth(cardContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % servicesLength);
      }, 6000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, servicesLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, servicesLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % servicesLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [servicesLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + servicesLength) % servicesLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [servicesLength]);

  // Transform styles
  function getCardStyle(index) {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.35;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + servicesLength) % servicesLength === index;
    const isRight = (activeIndex + 1) % servicesLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-50%) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.55,
        pointerEvents: "auto",
        transform: `translateX(calc(-50% - ${gap}px)) translateY(-${maxStickUp}px) scale(0.8) rotateY(20deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.55,
        pointerEvents: "auto",
        transform: `translateX(calc(-50% + ${gap}px)) translateY(-${maxStickUp}px) scale(0.8) rotateY(-20deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(-50%) translateY(0px) scale(0.6) rotateY(0deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const contentVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className="w-full max-w-6xl p-4 md:p-8 mx-auto overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center overflow-visible">
        {/* 3D Circular Cards Stack */}
        <div className="lg:col-span-5 relative w-full h-[18rem] md:h-[22rem] [perspective:1000px] overflow-visible" ref={cardContainerRef}>
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                className={`absolute w-full max-w-[14rem] md:max-w-[18rem] h-full left-1/2 rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? "border-white/20 shadow-[0_20px_50px_rgba(93,130,240,0.3)] scale-105" 
                    : "border-white/10 opacity-40 hover:opacity-60"
                }`}
                style={getCardStyle(index)}
              >
                {service.image && (
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover select-none pointer-events-none" 
                  />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Service Content details */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full py-4 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-[12rem] flex flex-col justify-center"
            >
              <div className="text-xs uppercase tracking-[0.4em] text-accent-blue font-bold mb-4">
                Capability 0{activeIndex + 1}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold leading-[1.1] text-balance">
                {activeService.title}
              </h3>
              
              <p className="text-base md:text-lg mt-6 leading-relaxed text-white/75">
                {activeService.copy}
              </p>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Controls */}
          <div className="flex gap-4 pt-8 lg:pt-6">
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all border border-white/10 text-white hover:bg-accent-blue hover:border-accent-blue hover:scale-105 active:scale-95"
              onClick={handlePrev}
              style={{
                backgroundColor: hoverPrev ? "var(--accent-blue)" : "transparent",
                borderColor: hoverPrev ? "var(--accent-blue)" : "rgba(255, 255, 255, 0.1)",
              }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous service"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <button
              className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all border text-white hover:scale-105 active:scale-95"
              onClick={handleNext}
              style={{
                backgroundColor: hoverNext ? "rgba(93, 130, 240, 0.85)" : "var(--accent-blue)",
                borderColor: "var(--accent-blue)",
              }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next service"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
