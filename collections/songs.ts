// songs.ts

import { CollectionConfig } from "payload/types";

export const Songs: CollectionConfig = {
  slug: "songs",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "year",
      type: "number",
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "img",
      type: "upload",
      relationTo: "media",
      required: true,
    },
  ],
};

export default Songs;
