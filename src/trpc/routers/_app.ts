import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { authRouter } from "@/modules/auth/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { tagsRouter } from "@/modules/tags/server/procedures";
import { tenantsRouter } from "@/modules/tenants/server/procedures";
import { checkoutRouter } from "@/modules/checkout/server/procedures";
export const appRouter = createTRPCRouter({
  // hello: baseProcedure
  //   .input(
  //     z.object({
  //       text: z.string(),
  //     })
  //   )
  //   .query((opts) => {
  //     return {
  //       greeting: `hello ${opts.input.text}`,
  //     };
  //   }),
  auth: authRouter,
  products: productsRouter,
  categories: categoriesRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  checkout: checkoutRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
