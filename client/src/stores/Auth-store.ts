import { create } from "zustand"
import { CoverPanelOptions } from "../types/Auth-types"
import { IUserRepository } from "../../../api/src/types/DB-types"
// import { persist } from "zustand/middleware"



type IUseAvatarListState = {
	avatarListState: boolean;
	setAvatarListState: (status: boolean) => void;
}
const useAvatarListState = create<IUseAvatarListState>(set => ({
	avatarListState: false,
	setAvatarListState: (state) => set({ avatarListState: state }),
}))


type IUseCoverPanelState = {
    coverPanelState: CoverPanelOptions;
    setCoverPanelState: (state: CoverPanelOptions) => void;
}
const useCoverPanelState = create<IUseCoverPanelState>(set => ({
    coverPanelState: 'sign_in',
    setCoverPanelState: (state) => set({ coverPanelState: state })
}))

type IUseUserInfoState = {
	userInfoState: IUserRepository | null;
	setUserInfoState: (state: IUserRepository) => void;
}
const useUserInfoState = create<IUseUserInfoState>(set => ({
	userInfoState: null,
	setUserInfoState: (state) => set({ userInfoState: state })
}))

export {
	useAvatarListState,
	useCoverPanelState,
	useUserInfoState,
}