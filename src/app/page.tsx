import Film from "@/types/film";
import { client } from "@/sanity/client";

import HomeClient from "./home-client";

const POSTS_QUERY = `*[
  _type == "film"
  && defined(slug.current)
]|order(releaseYear desc)[0...12]{_id, title, slug, releaseYear, poster, posterFont, hero}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const films = await client.fetch<Film[]>(POSTS_QUERY, {}, options);

  return <HomeClient films={films} />;
}
