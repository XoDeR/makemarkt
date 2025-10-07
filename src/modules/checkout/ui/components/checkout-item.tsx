import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface Props {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  id: string;
  price: number;
  onRemove: () => void;
};

export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  id,
  price,
  onRemove,
}: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative aspect-square h-full">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}