import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

import { client } from "@/sanity/client";
import Image from "next/image";
const builder = imageUrlBuilder(client);
function urlFor(source: SanityDocument) {
  return builder.image(source);
}
const POSTS_QUERY = `*[
  _type == "movie"
  && defined(slug.current)
]|order(releaseDate desc)[0...12]{_id, title, slug, releaseDate, poster}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="" key={post._id}>
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <h2 className="">{post.slug.current}</h2>
            <p>{`${"https://cdn.sanity.io/images/4ov954nv/production/"}${
              post.poster.asset._ref
            }`}</p>
            <Image
              src={urlFor(post.poster).width(500).url()}
              alt="Poster"
              height={200}
              width={300}
            />
            <hr />
            <p>{JSON.stringify(post)}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
