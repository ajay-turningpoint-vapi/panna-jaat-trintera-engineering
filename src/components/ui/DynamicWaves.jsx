import React, { useState, useEffect, useRef } from "react";

const DynamicWaves = ({
  amplitude = 40,
  frequency = 0.02,
  speed = 0.05,
  color = "#3b82f6",
  height = 300,
  opacity = 0.5,
  waveCount = 3,
  className = "",
}) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1000, height });
  const [time, setTime] = useState(0);
  const animationRef = useRef(null);
  const frameRef = useRef(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const rect = svgRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          setDimensions({ width: rect.width, height });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      frameRef.current += 1;
      if (frameRef.current % 2 === 0) {
        setTime((prev) => prev + 1);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const generateWavePath = (waveIndex) => {
    let path = `M 0 ${dimensions.height / 2}`;
    const step = Math.max(5, dimensions.width / 200);

    for (let x = 0; x < dimensions.width; x += step) {
      const y =
        Math.sin(
          x * frequency + time * speed + (waveIndex * Math.PI) / waveCount,
        ) *
          amplitude +
        dimensions.height / 2;
      path += ` L ${x} ${y}`;
    }

    path += ` L ${dimensions.width} ${dimensions.height} L 0 ${dimensions.height} Z`;
    return path;
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
        className="absolute top-0 left-0"
      >
        {Array.from({ length: waveCount }).map((_, index) => (
          <path
            key={index}
            d={generateWavePath(index)}
            fill={color}
            opacity={opacity / waveCount}
          />
        ))}
      </svg>
    </div>
  );
};

export default DynamicWaves;
