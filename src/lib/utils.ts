import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTenantUrl(tenantSlug: string) {
  // in dev mode use normal routing
  if (process.env.NODE_ENV === "development") {
    return `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${tenantSlug}`;
  }

  let protocol = "https";
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN!;

  // if (process.env.NODE_ENV === "development") {
  //   protocol = "http";
  // }

  // in prod use subdomain routing
  // example: https://john.makemarkt.com
  return `${protocol}://${tenantSlug}.${domain}`;
}

export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value))
}
