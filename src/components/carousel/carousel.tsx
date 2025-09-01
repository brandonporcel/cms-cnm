"use client";

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

  useAnimationFrame((t, delta) => {
    const velocity = 0.05;
    let move = x.get() - velocity * delta;
    const totalWidth = films.length * 320;
    if (Math.abs(move) >= totalWidth) move = 0;
    x.set(move);
  });

  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
      <motion.div className="flex gap-8" style={{ x }}>
        {[...films, ...films].map((film, i) => (
          <div
            key={i}
            onClick={() => onActiveChange(film)}
            className="shrink-0 w-80 cursor-pointer"
          >
            <img
              src={urlFor(film.posterFont).url()}
              alt={film.title}
              className={`rounded-2xl shadow-lg`}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
