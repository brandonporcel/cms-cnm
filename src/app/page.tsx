"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

import Footer from "@/components/footer";
import Header from "@/components/header";

const items = [
  { id: 1, title: "Item 1", image: "/img1.png", footer: "Este es el item 1" },
  { id: 2, title: "Item 2", image: "/img2.jpg", footer: "Este es el item 2" },
  { id: 3, title: "Item 3", image: "/img3.jpg", footer: "Este es el item 3" },
];

export default function Home() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(items[0]);

  // valor de X controlado manualmente
  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    if (!paused) {
      // velocidad px/ms (ej: 0.05 → 50px por segundo)
      const velocity = 0.05;
      let move = x.get() - velocity * delta;

      // reinicia cuando se pasó la mitad (porque duplicamos el contenido)
      const totalWidth = items.length * 320; // 320px = ancho aprox. item+gap
      if (Math.abs(move) >= totalWidth) {
        move = 0;
      }

      x.set(move);
    }
  });

  return (
    <div
      className="min-h-screen relative overflow-hidden pl-8"
      style={{
        backgroundImage: `url(${active.image.substring(1)})`,
        backgroundSize: "cover",
      }}
    >
      <Header />
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="absolute top-1/2 left-0 w-full -translate-y-1/2"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div className="flex gap-8" style={{ x }}>
          {[...items, ...items].map((item, i) => (
            <div
              key={i}
              onClick={() => setActive(item)}
              className="shrink-0 w-80 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="rounded-2xl shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 w-full text-center text-white">
        <p className="text-lg">{active.footer}</p>
      </div>

      <div className="absolute bottom-14 z-20">
        <div className="w-[90px] h-[125px] relative mb-1">
          <Image
            src="https://images.theconversation.com/files/625049/original/file-20241010-15-95v3ha.jpg?ixlib=rb-4.1.0&rect=4%2C12%2C2679%2C1521&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
            alt="Poster"
            className="object-cover rounded-xl"
            fill
          />
        </div>
        <p className="lowercase font-sans cursor-default">{active.title}</p>
      </div>

      <Footer />
    </div>
  );
}
