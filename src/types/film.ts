import {
  type SanityDocument,
  type SanityImageAssetDocument,
} from "next-sanity";

export default interface Film extends SanityDocument {
  title: string;
  slug: string;
  releaseYear: number;
  poster: SanityImageAssetDocument;
  posterFont: SanityImageAssetDocument;
  hero: SanityImageAssetDocument;
}
