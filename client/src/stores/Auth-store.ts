import { create } from "zustand"
import { CoverPanelOptions } from "../types/Auth-types"
// import { persist } from "zustand/middleware"



type IUseAvatarListState = {
	isAvatarListOpened: boolean;
	setIsAvatarListOpened: (status: boolean) => void;
}
const useAvatarListState = create<IUseAvatarListState>(set => ({
	isAvatarListOpened: false,
	setIsAvatarListOpened: (state: boolean) => set({ isAvatarListOpened: state }),
}))


type IUseCoverPanelState = {
    coverPanelState: CoverPanelOptions;
    setCoverPanelState: (state: string) => void;
}
const useCoverPanelState = create<IUseCoverPanelState>(set => ({
    coverPanelState: 'sign_in',
    setCoverPanelState: (state: CoverPanelOptions) => set({ coverPanelState: state })
}))

export {
	useAvatarListState,
	useCoverPanelState,
}