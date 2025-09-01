"use client";

import { useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

import Film from "@/types/film";
import urlFor from "@/lib/sanityImage";

export default function Carousel({
  films,
  onActiveChange,
}: {
  films: Film[];
  onActiveChange: (film: Film) => void;
}) {
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_t, delta) => {
    if (paused) return;

    const velocity = 0.2;
    let move = x.get() - velocity * delta;

    const totalWidth = films.length * 320;

    // suavizar el reseteo (ver abajo)
    if (Math.abs(move) >= totalWidth) {
      move = 0;
    }

    x.set(move);
  });

  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden">
      <motion.div className="flex gap-8 items-center" style={{ x }}>
        {[...films, ...films].map((film, i) => (
          <div
            key={i}
            onClick={() => onActiveChange(film)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="shrink-0 w-80 cursor-pointer"
          >
            <img
              src={urlFor(film.posterFont).url()}
              alt={film.title}
              className="rounded-2xl shadow-lg"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
