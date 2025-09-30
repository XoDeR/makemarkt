"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";

interface Props {
  productId: string;
  tenantSlug: string;
};

export const ProductView = ({ productId, tenantSlug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ id: productId }));

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data.image?.url || "/placeholder.png"}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}