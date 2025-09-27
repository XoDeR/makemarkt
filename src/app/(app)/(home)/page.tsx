//"use client";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress";
// import { Textarea } from "@/components/ui/textarea";
// import { useTRPC } from "@/trpc/client";
// import { useQuery } from "@tanstack/react-query";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { SearchParams } from "nuqs/server";
import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { DEFAULT_LIMIT } from "@/constants";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Home = async ({ searchParams }: Props) => {
  // const trpc = useTRPC();
  // const categories = useQuery(trpc.categories.getMany.queryOptions());

  // const { data } = useQuery(trpc.auth.session.queryOptions());

  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
    ...filters,
    limit: DEFAULT_LIMIT,
  }));

  // return (
  //   <div className="p-4">
  //     <div>
  //       {JSON.stringify(data?.user, null, 2)}
  //     </div>
  //     <div className="flex flex-col gap-y-4">
  //       <div>
  //         <Button variant="elevated">
  //           Button
  //         </Button>
  //       </div>
  //       <div>
  //         <Input placeholder="Input" />
  //       </div>
  //       <div>
  //         <Progress value={50} />
  //       </div>
  //       <div>
  //         <Textarea placeholder="Textarea" />
  //       </div>
  //       <div>
  //         <Checkbox />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  )
}

export default Home;
