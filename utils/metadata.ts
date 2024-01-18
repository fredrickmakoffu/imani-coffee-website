import { Metadata } from "next";

export function constructMetaData({
  title = "itsthewestend",
  description = "DJ & EDM Producer",
  image = "/assets/westendMenu.jpg",
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
      creator: "@itsthewestend",
    },
    icons,
    metadataBase: new URL("https://itsthewestend.com"),
    themeColor: "#efefef",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
