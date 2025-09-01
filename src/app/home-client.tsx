"use client";

import { useState } from "react";

import Film from "@/types/film";
import urlFor from "@/lib/sanityImage";
import CarouselContainer from "@/components/carousel/container";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function HomeClient({ films }: { films: Film[] }) {
  const [active, setActive] = useState(films[0]);
  console.log("active", active);
  return (
    <div
      className="min-h-screen relative overflow-hidden pl-8"
      style={{
        backgroundImage: `url(${urlFor(active.hero || active.poster).url()})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />

      <div className="absolute inset-0 bg-black/60" />
      <CarouselContainer
        films={films}
        onActiveChange={setActive}
        active={active}
      />

      <Footer />
    </div>
  );
}
