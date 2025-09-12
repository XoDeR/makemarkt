import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.input(z.object({
    category: z.string().nullable().optional(),
  })).query(async ({ ctx, input }) => {
    const where: Where = {};

    if (input.category) {
      const categoriesData = await ctx.db.find({
        collection: "categories",
        limit: 1,
        depth: 1, // Load (populate) only 1 level of subcategories: subcategories.[0] will be a type of Category
        pagination: false,
        where: {
          slug: {
            equals: input.category,
          }
        }
      });

      const formattedData = categoriesData.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          // To be sure doc is a type of Category because depth: 1 is used
          ...(doc as Category),
          subcategories: undefined,
        })),
      }));

      const subcategoriesSlugs = [];
      const parentCategory = formattedData[0];

      if (parentCategory) {
        subcategoriesSlugs.push(
          ...parentCategory.subcategories.map((subcategory) => subcategory.slug)
        )
      }

      where["category.slug"] = {
        in: [parentCategory.slug, ...subcategoriesSlugs],
      }
    }

    const data = await ctx.db.find({
      collection: "products",
      depth: 1, // Populate "category", "image"
      where
    });

    return data;
  }),
});
