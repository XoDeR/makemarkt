import { Category } from "@/payload-types";
import { Dice1 } from "lucide-react";
import { CategoryDropdown } from "./category-dropdown";

interface Props {
  data: any;
};

export const Categories = ({
  data
}: Props) => {
  return (
    <>
      <div>
        Categories: {JSON.stringify(data, null, 2)}
      </div>
      <div>
        {data.map((category: Category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </>
  )
}