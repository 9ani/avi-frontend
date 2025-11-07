"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface SpinnerProps {
  width?: number;
  height?: number;
  className?: string;
  speed?: number; // Animation speed in milliseconds per frame
}

const Spinner: React.FC<SpinnerProps> = ({
  width = 20,
  height = 20,
  className = "",
  speed = 100,
}) => {
  const [currentFrame, setCurrentFrame] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev >= 9 ? 1 : prev + 1));
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <Image
      src={`/icons/Spinner/spinner-${currentFrame}.svg`}
      alt="Loading spinner"
      width={width} 
      height={height}
      className={className}
    />
  );
};

export default Spinner;
