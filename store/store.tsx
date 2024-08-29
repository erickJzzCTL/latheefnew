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

  isModalOpen: false,
  setIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

  homeData: {},
  setHomeData: (data) => set({ homeData: data }),


}));

export default useStore;
