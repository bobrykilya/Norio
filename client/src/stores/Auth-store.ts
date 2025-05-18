import { create } from 'zustand'

import { IUserRepository } from '@api/src/types/DB-types'
import { ICommonVar } from '@shared/types/Global-types'
import { CoverPanelOptions } from '@type/Auth-types'

// import { persist } from "zustand/middleware"


type IUseCoverPanelState = {
	coverPanelState: CoverPanelOptions;
	setCoverPanelState: (state: CoverPanelOptions) => void;
}
export const useCoverPanelState = create<IUseCoverPanelState>(set => ({
	coverPanelState: 'sign_in',
	setCoverPanelState: (state) => set({ coverPanelState: state }),
}))


type IUseAuthState = {
	appReadyState: boolean;
	setAppReadyState: (state: boolean) => void;
	socketSessIdState: string;
	setSocketSessIdState: (state: string) => void;
}
export const useAuthState = create<IUseAuthState>(set => ({
	appReadyState: false,
	setAppReadyState: (state) => set({ appReadyState: state }),

	socketSessIdState: '',
	setSocketSessIdState: (state) => set({ socketSessIdState: state }),
}))


type IJWTInfo = {
	userInfo: IUserRepository;
	token: string;
	isFast?: boolean;
}
type IUseJwtInfoState = {
	jwtInfoListState: IJWTInfo[];
	getJwtInfoState: (userId: ICommonVar['id']) => IJWTInfo;
	addJwtInfoState: (state: IJWTInfo) => void;
	removeJwtInfoState: (userId?: ICommonVar['id']) => void;
	updateJWTUserInfoState: (userId: ICommonVar['id'], data: Partial<IUserRepository>) => void;
}
export const useJwtInfoListState = create<IUseJwtInfoState>((set, get) => ({
	jwtInfoListState: [],
	addJwtInfoState: (state) => {
		const { jwtInfoListState } = get()
		const duplicateIndex = jwtInfoListState.findIndex(el => el.userInfo.userId === state.userInfo.userId)

		if (duplicateIndex !== -1) {
			jwtInfoListState.splice(duplicateIndex, 1)
		}

		jwtInfoListState.push(state)

		set({ jwtInfoListState })
	},
	getJwtInfoState: (userId) => get().jwtInfoListState.find(el => el.userInfo.userId === userId),
	removeJwtInfoState: (userId) => {

		if (!userId) {
			set({ jwtInfoListState: [] })
			return
		}

		const { jwtInfoListState } = get()

		set({
			jwtInfoListState: jwtInfoListState.filter(el => el.userInfo.userId !== userId),
		})
	},
	updateJWTUserInfoState: (userId, data) => {
		const { jwtInfoListState } = get()

		set({
			jwtInfoListState: jwtInfoListState.map(el => {
				if (el.userInfo.userId !== userId) {
					return el
				}

				return {
					...el,
					userInfo: {
						...el.userInfo,
						...data,
					},
				}
			}),
		})
	},
}))