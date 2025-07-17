import { Category } from "@/payload-types";

interface Props {
  category: Category;
  isOpen: boolean;
  position: { top: number; left: number }
}

export const SubcategoryMenu = ({
  category,
  isOpen,
  position,
}: Props) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null;
  }

  const backgrounColor = category.color || "#f5f5f5";

  return (
    <div
      className="fixed z-100"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Extra space on top not to remove on-hover */}
      <div className="h3 w-60" />
      <div className="w-60 text-black rounded-md overflow-hidden border">
        <p>Subcategory menu</p>
      </div>
    </div>
  )
}