"use client";

import { useEffect, useRef, useState } from "react";

const stickers = [
  {
    id: 1,
    content: (
      <div className="w-32 h-16 bg-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-2 bg-blue-300 rounded-full flex items-center justify-center">
          <div className="w-8 h-3 bg-blue-600 rounded-full"></div>
          <div className="w-6 h-2 bg-blue-600 rounded-full ml-1"></div>
          <div className="w-4 h-1 bg-blue-600 rounded-full ml-1"></div>
        </div>
        <div className="absolute top-1 left-2 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-2 right-3 w-1 h-1 bg-white rounded-full opacity-40"></div>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="w-28 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-gray-200 relative">
        <div className="text-black text-xs font-bold transform -rotate-12">
          <div className="flex flex-col items-center">
            <div className="text-[8px] leading-none">SUPER</div>
            <div className="text-[6px] leading-none">FOUNDATION</div>
          </div>
        </div>
        <div className="absolute inset-1 border border-gray-300 rounded-xl"></div>
      </div>
    ),
  },
  {
    id: 3,
    content: (
      <div className="w-28 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center relative">
        <div className="grid grid-cols-4 gap-1 p-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="w-32 h-16 bg-blue-100 rounded-2xl flex items-center justify-center relative">
        <div className="w-20 h-8 bg-blue-600 rounded-full transform rotate-12 relative">
          <div className="absolute inset-1 bg-blue-400 rounded-full"></div>
          <div className="absolute top-1 right-2 w-8 h-2 bg-blue-200 rounded-full"></div>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    content: (
      <div className="w-24 h-16 bg-orange-100 rounded-full flex items-center justify-center relative">
        <div className="w-16 h-8 bg-orange-400 rounded-full relative">
          <div className="absolute top-1 left-2 w-3 h-3 bg-orange-600 rounded-full"></div>
          <div className="absolute bottom-1 right-3 w-2 h-2 bg-orange-600 rounded-full"></div>
        </div>
      </div>
    ),
  },
];

export default function Carousel() {
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<any>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPaused) return;

    const animate = () => {
      setTranslateX((prev) => {
        const newValue = prev - 1;
        // Reset when all stickers have scrolled past
        if (newValue <= -window.innerWidth - 200) {
          return window.innerWidth;
        }
        return newValue;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div
      className="w-full overflow-hidden relative h-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      <div
        className="flex items-center gap-6 absolute top-1/2 -translate-y-1/2"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isPaused ? "transform 0.3s ease" : "none",
        }}
      >
        {/* Render multiple sets of stickers for seamless loop */}
        {Array.from({ length: 3 }).map((_, setIndex) =>
          stickers.map((sticker, index) => (
            <div key={`${setIndex}-${sticker.id}`} className="flex-shrink-0">
              {sticker.content}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
