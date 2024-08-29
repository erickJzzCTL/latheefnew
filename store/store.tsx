import { create } from "zustand";

interface PanelState {
  isOpen: boolean;
  togglePanel: () => void;
  homeData: Record<string, any>;
  setHomeData: (data: Record<string, any>) => void;
  isModalOpen: boolean;
  setIsModalOpen: () => void;

}

const useStore = create<PanelState>((set) => ({
  isOpen: false,
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  homeData: {},
  setHomeData: (data) => set({ homeData: data }),

  isModalOpen: false,
  setIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),


}));

export default useStore;
