import Film from "@/types/film";

import Poster from "../poster";
import Carousel from "./carousel";

export default function CarouselContainer({
  films,
  onActiveChange,
  active,
}: {
  films: Film[];
  onActiveChange: (active: Film) => void;
  active: Film;
}) {
  return (
    <>
      <Carousel films={films} onActiveChange={onActiveChange} />

      <div className="absolute bottom-14 z-20">
        <Poster url={active.poster} alt={active.title} />
        <p className="lowercase font-sans cursor-default">
          {active.title} {active.releaseYear}
        </p>
      </div>
    </>
  );
}
