"use client";

import { useCart } from "@/modules/checkout/hooks/use-cart";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const { productIds, clearAllCarts } = useCart(tenantSlug);

  const trpc = useTRPC();
  const { data, error } = useQuery(trpc.checkout.getProducts.queryOptions({
    ids: productIds,
  }));

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts(); // removing invalid data
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearAllCarts])

  return (
    <div>
      Checkout View
      {tenantSlug}
      {JSON.stringify(data, null, 2)}
    </div>
  )
}