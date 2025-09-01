import { RefObject } from "react";

export const useDropdownPosition = (
  ref: RefObject<HTMLDivElement | null> | RefObject<HTMLDivElement>
) => {
  const getDropdownPosition = () => {
    if (!ref.current) return { top: 0, left: 0 };

    const rect = ref.current.getBoundingClientRect();
    const dropdownWidth = 240; // 240px === w-60 in tailwind

    let left = rect.left + window.scrollX;
    const top = rect.bottom + window.scrollY;

    if (left + dropdownWidth > window.innerWidth) {
      // overflowing, adjust left
      left = rect.right + window.scrollX - dropdownWidth;
      if (left < 0) {
        left = window.innerWidth - dropdownWidth - 16;
      }
    }

    if (left < 0) {
      left = 16;
    }

    return { top, left };
  };

  return { getDropdownPosition };
}