import { Image } from "@/components/types/image";

export const imageSearchableFields = [
  "title",
  "tags",
  "description",
  "alt",
  "creditArtistName",
  "creditArtistWebsite",
  "creditArtTitle",
  "creditArtUrl",
  "linkUrl",
  "filename",
];

export function createImageSearchDocument(image: Image) {
  return {
    id: image.id,
    title: image.title ?? "",
    tags: image.tags ?? "",
    description: image.description ?? "",
    alt: image.alt ?? "",
    creditArtistName: image.creditArtistName ?? "",
    creditArtistWebsite: image.creditArtistWebsite ?? "",
    creditArtTitle: image.creditArtTitle ?? "",
    creditArtUrl: image.creditArtUrl ?? "",
    linkUrl: image.linkUrl ?? "",
    filename: image.filename ?? "",
  };
}
