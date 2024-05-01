import { create } from "zustand";

interface useCategoriesModalCategory {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryModal = create<useCategoriesModalCategory>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
