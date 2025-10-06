"use client";

interface Props {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: Props) => {
  return (
    <div>
      Checkout View
      {tenantSlug}
    </div>
  )
}