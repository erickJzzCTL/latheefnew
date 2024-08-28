import { create } from "zustand";

interface PanelState {
  isOpen: boolean;
  togglePanel: () => void;
  homeData: Record<string, any>;
  setHomeData: (data: Record<string, any>) => void;
}

const useStore = create<PanelState>((set) => ({
  isOpen: false,
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  homeData: {},
  setHomeData: (data) => set({ homeData: data }),
}));

export default useStore;
