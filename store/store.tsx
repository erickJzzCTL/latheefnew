import { create } from "zustand";

interface PanelState {
  isOpen: boolean;
  togglePanel: () => void;
  homeData: Record<string, any>;
  setHomeData: (data: Record<string, any>) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string | null) => void;
  forgetPwdMail: string | null;
  setForgetPwdMail: (forgetPwdMail: string | null) => void;
  userotp: string | null;
  setUserOTP: (otp: string | null) => void;
  openCategory: number | null;
  setOpenCategory: (id: number | null) => void;
}

const useStore = create<PanelState>((set) => ({
  isOpen: false,
  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),

  isModalOpen: false,
  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

  homeData: {},
  setHomeData: (data) => set({ homeData: data }),

  selectedSubcategory: null,
  setSelectedSubcategory: (subcategory) => set({ selectedSubcategory: subcategory }),


  forgetPwdMail: null,
  setForgetPwdMail: (data) => set({ forgetPwdMail: data }),

  userotp: null,
  setUserOTP: (otp) => set({ userotp: otp }),

  openCategory: null,
  setOpenCategory: (id) => set({ openCategory: id }),

}));

export default useStore;
