import { create } from 'zustand'

import { IUserRepository } from '@api/src/types/DB-types'
// import { immer } from "zustand/middleware/immer" 


type IUseUserInfoState = {
	userInfoState: IUserRepository | null;
	setUserInfoState: (state: IUserRepository) => void;
	updateUserInfoState: (data: Partial<IUserRepository>) => void;
	isUserLogged: () => boolean;
}
export const useUserInfoState = create<IUseUserInfoState>((set, get) => ({
	userInfoState: null,
	setUserInfoState: (state) => set({ userInfoState: state }),
	updateUserInfoState: (data) => {
		const userInfoState = get().userInfoState

		set({
			userInfoState: {
				...userInfoState,
				...data,
			},
		})
	},
	isUserLogged: () => Boolean(get().userInfoState),
}))