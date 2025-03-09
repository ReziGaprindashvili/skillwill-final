import { create } from 'zustand';

interface PhotoStoreState {
  searchVal: string;
  currentPage: number;
  setSearchVal: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export const usePhotoStore = create<PhotoStoreState>((set) => ({
  searchVal: '',
  currentPage: 1,
  setSearchVal: (value) => set({ searchVal: value }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
