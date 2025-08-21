import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true, // Email added by default
  fields: [
    {
      name: "username",
      required: true,
      unique: true,
      type: "text",
    },
  ],
};
