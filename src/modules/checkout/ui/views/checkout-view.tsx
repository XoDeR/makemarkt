"use client";

import { generateTenantUrl } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { CheckoutItem } from "../components/checkout-item";

interface Props {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  const { productIds, removeProduct, clearAllCarts } = useCart(tenantSlug);

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
    <div className="lg:pt-16 pt-4 lg:px-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
        {/* Column 1 Items */}
        <div className="lg:col-span-4">
          <div className="border rounded-md overflow-hidden bg-white">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                id={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantUrl(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantUrl(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        {/* Column 2 Checkout sidebar */}
        <div className="lg:col-span-3">
          Checkout sidebar
        </div>
      </div>
    </div>
  )
}