import { Metadata } from "next";

export function constructMetaData({
  title = "Imani Coffee",
  description = "Imani Coffee is a specialty coffee house dedicated to rare origins, mindful sourcing, and nature-inspired craft. Experience the art of coffee, from farm to cup.",
  image = "/assets/ogImage.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@imani.coffee",
    },
    icons,
  metadataBase: new URL("https://imani.coffee"),
  themeColor: "#FFFBF6",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
