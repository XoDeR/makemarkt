import { CustomCategory } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[]; // Temporary. This will be removed later.
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  return (
    <div>
      Categories sidebar
    </div>
  )
}