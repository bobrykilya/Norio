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



type IUseAuthState = {
	appReadyState: boolean;
	setAppReadyState: (state: boolean) => void;
	listOfUsedAvatarsState: ICommonVar['avatar'][];
	setListOfUsedAvatarsState: (state: ICommonVar['avatar'][]) => void;
	socketSessIdState: string;
	setSocketSessIdState: (state: string) => void;
}
const useAuthState = create<IUseAuthState>(set => ({
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
	getJwtInfoState: (username: string) => IJWTInfo;
	addJwtInfoState: (state: IJWTInfo) => void;
	removeJwtInfoState: (username?: string) => void;
}
const useJwtInfoListState = create<IUseJwtInfoState>()(immer((set, get) => ({
	jwtInfoListState: [],
	getJwtInfoState: (username) => get().jwtInfoListState.find(el => el.userInfo.username === username),
	addJwtInfoState: (state) => {
		const jwtInfoListState = get().jwtInfoListState
		// console.log('addJwtInfoState')

		if (Boolean(jwtInfoListState.find(el => el.userInfo.username === state.userInfo.username))) {
			return
		}

		jwtInfoListState.push(state)

		set({ jwtInfoListState })
	},
	removeJwtInfoState: (username) => {

		if (!username) {
			set({ jwtInfoListState: [] })
			return
		}

		const jwtInfoListState = get().jwtInfoListState

		set({ jwtInfoListState: jwtInfoListState.filter(el=> el.userInfo.username !== username) })
	},
})))


export {
	useCoverPanelState,
	useUserInfoState,
	useAuthState,
	useJwtInfoListState,
}