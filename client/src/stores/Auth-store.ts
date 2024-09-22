import { create } from "zustand"
import { CoverPanelOptions } from "../types/Auth-types"
// import { persist } from "zustand/middleware"



type IUseAvatarList = {
	isAvatarListOpened: boolean;
	setIsAvatarListOpened: (status: boolean) => void;
}
export const useAvatarList = create<IUseAvatarList>(set => ({
	isAvatarListOpened: false,
	setIsAvatarListOpened: (state: boolean) => set({ isAvatarListOpened: state }),
}))


type IUseCoverPanelState = {
    coverPanelState: CoverPanelOptions;
    setCoverPanelState: (state: string) => void;
}
export const useCoverPanelState = create<IUseCoverPanelState>(set => ({
    coverPanelState: 'sign_in',
    setCoverPanelState: (state: CoverPanelOptions) => set({ coverPanelState: state })
}))