import { create } from "zustand";

interface useStoreModalStore2 {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal2 = create<useStoreModalStore2>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

