import { create } from "zustand";

interface PanelState {
  isOpen: boolean;
  togglePanel: () => void;
}

const useStore = create<PanelState>((set) => ({
  //   Sidepanel Toggle
  isOpen: false,
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useStore;
