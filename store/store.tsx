import { create } from 'zustand';

interface PanelState {
  isOpen: boolean;
  togglePanel: () => void;
  homeData: Record<string, any>;
  setHomeData: (data: Record<string, any>) => void;
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string | null) => void;
  forgetPwdMail: string | null;
  setForgetPwdMail: (forgetPwdMail: string | null) => void;
  userotp: string | null;
  setUserOTP: (forgetPwdMail: string | null) => void;
}

const useStore = create<PanelState>(set => ({
  isOpen: false,
  togglePanel: () => set(state => ({ isOpen: !state.isOpen })),

  isModalOpen: false,
  setIsModalOpen: () => set(state => ({ isModalOpen: !state.isModalOpen })),

  homeData: {},
  setHomeData: data => set({ homeData: data }),

  selectedSubcategory: null,
  setSelectedSubcategory: subcategory =>
    set({ selectedSubcategory: subcategory }),

  forgetPwdMail: null,
  setForgetPwdMail: data => set({ forgetPwdMail: data }),
  userotp: null,
  setUserOTP: data => set({ userotp: data }),
}));

export default useStore;
