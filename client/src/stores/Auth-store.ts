import { create } from "zustand"
import { CoverPanelOptions } from "../types/Auth-types"
import { IUserRepository } from "../../../api/src/types/DB-types"
import { ICommonVar } from "../../../common/types/Global-types"
import { immer } from "zustand/middleware/immer"
// import { persist } from "zustand/middleware"



type IUseCoverPanelState = {
    coverPanelState: CoverPanelOptions;
    setCoverPanelState: (state: CoverPanelOptions) => void;
}
export const useCoverPanelState = create<IUseCoverPanelState>(set => ({
    coverPanelState: 'sign_in',
    setCoverPanelState: (state) => set({ coverPanelState: state })
}))



type IUseAuthState = {
	appReadyState: boolean;
	setAppReadyState: (state: boolean) => void;
	listOfUsedAvatarsState: ICommonVar['avatar'][];
	setListOfUsedAvatarsState: (state: ICommonVar['avatar'][]) => void;
	socketSessIdState: string;
	setSocketSessIdState: (state: string) => void;
}
export const useAuthState = create<IUseAuthState>(set => ({
	appReadyState: false,
	setAppReadyState: (state) => set({ appReadyState: state }),

	listOfUsedAvatarsState: [],
	setListOfUsedAvatarsState: (state) => set({ listOfUsedAvatarsState: state }),

	socketSessIdState: '',
	setSocketSessIdState: (state) => set({ socketSessIdState: state })
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
}
export const useJwtInfoListState = create<IUseJwtInfoState>()(immer((set, get) => ({
	jwtInfoListState: [],
	addJwtInfoState: (state) => {
		const jwtInfoListState = get().jwtInfoListState
		const duplicatePos = jwtInfoListState.findIndex(el => el.userInfo.userId === state.userInfo.userId)

		if (duplicatePos !== -1) {
			jwtInfoListState.splice(duplicatePos, 1)
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

		const jwtInfoListState = get().jwtInfoListState

		set({ jwtInfoListState: jwtInfoListState.filter(el=> el.userInfo.userId !== userId) })
	},
})))