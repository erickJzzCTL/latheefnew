  import { create } from "zustand";

  interface PanelState {
    isOpen: boolean;
    togglePanel: () => void;
    homeData: Record<string, any>;
    setHomeData: (data: Record<string, any>) => void;
    isModalOpen: boolean;
    setIsModalOpen: () => void;
    selectedSubcategory: string | null;
    setSelectedSubcategory: (subcategory: string | null) => void;
  }

  const useStore = create<PanelState>((set) => ({
    isOpen: false,
    togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),

    isModalOpen: false,
    setIsModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),

    homeData: {},
    setHomeData: (data) => set({ homeData: data }),

    selectedSubcategory: null,
    setSelectedSubcategory: (subcategory) => set({ selectedSubcategory: subcategory }),
  }));

  export default useStore;
