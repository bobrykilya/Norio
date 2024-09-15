import { create } from "zustand"
// import { persist } from "zustand/middleware"



type IUseBlockError = {
	blockErrorMessage: string;
	setBlockErrorMessage: (blockErrorMessage: string) => void;
}
export const useBlockError = create<IUseBlockError>((set) => ({
	blockErrorMessage: '',
	setBlockErrorMessage: (blockErrorMessage: string) => set({ blockErrorMessage: blockErrorMessage }),
}))