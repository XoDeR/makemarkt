"use client";

import { useTRPC } from "@/trpc/client";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { BreadcrumbNavigation } from "./breadcrumb-navigation";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();

  // category
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find((cat) => cat.slug === activeCategory);
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  // subcategory
  const activeSubcategory = params.subcategory as string | undefined;

  const activeSubcategoryData = activeCategoryData?.subcategories?.find((subcat) => subcat.slug === activeSubcategory);
  const activeSubcategoryName = activeSubcategoryData?.name || null;

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{
      backgroundColor: activeCategoryColor,
    }}>
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategory={activeCategory}
        activeCategoryName={activeCategoryName}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  )
}

export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{
      backgroundColor: "#F5F5F5",
    }}>
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  )
}