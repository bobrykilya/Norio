import { create } from "zustand"
import { CoverPanelOptions } from "../types/Auth-types"
import { IUserRepository } from "../../../api/src/types/DB-types"
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
    setCoverPanelState: (state: CoverPanelOptions) => void;
}
const useCoverPanelState = create<IUseCoverPanelState>(set => ({
    coverPanelState: 'sign_in',
    setCoverPanelState: (state: CoverPanelOptions) => set({ coverPanelState: state })
}))

type IUseUserInfo = {
	userInfoState: IUserRepository | null;
	setUserInfoState: (state: IUserRepository) => void;
}
const useUserInfo = create<IUseUserInfo>(set => ({
	userInfoState: null,
	setUserInfoState: (state: IUserRepository) => set({ userInfoState: state })
}))

export {
	useAvatarListState,
	useCoverPanelState,
	useUserInfo,
}