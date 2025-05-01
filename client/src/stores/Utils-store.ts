import { create } from 'zustand'
import { ICommonVar } from '../../../common/types/Global-types'



type IUseLogBookCardState = {
	logBookCardState: boolean;
	setLogBookCardState: (state: boolean) => void;
}
export const useLogBookCardState = create<IUseLogBookCardState>(set => ({
	logBookCardState: false,
	setLogBookCardState: (state) => set({ logBookCardState: state }),
}))


type topCardStateOptions = 'accountInfo' | 'userInfo' | 'organization' | null
type IUseTopCardState = {
	topCardState: topCardStateOptions;
	setTopCardState: (state: topCardStateOptions) => void;
}
export const useTopCardState = create<IUseTopCardState>(set => ({
	// topCardState: null,
	topCardState: 'accountInfo',
	setTopCardState: (state) => set({ topCardState: state }),
}))


type bottomCardStateOptions = 'avatarList' | 'logBook' | null
type IUseBottomCardState = {
	bottomCardState: bottomCardStateOptions;
	setBottomCardState: (state: bottomCardStateOptions) => void;
}
export const useBottomCardState = create<IUseBottomCardState>(set => ({
	bottomCardState: null,
	// bottomCardState: 'avatarList',
	setBottomCardState: (state) => set({ bottomCardState: state }),
}))


type IUseAvatarState = {
	listOfUsedAvatarsState: ICommonVar['avatar'][];
	setListOfUsedAvatarsState: (state: ICommonVar['avatar'][]) => void;
	selectedAvatarState: ICommonVar['avatar'];
	setSelectedAvatarState: (state: ICommonVar['avatar']) => void;
}
export const useAvatarState = create<IUseAvatarState>(set => ({
	listOfUsedAvatarsState: [],
	setListOfUsedAvatarsState: (state) => set({ listOfUsedAvatarsState: state }),
	selectedAvatarState: '',
	setSelectedAvatarState: (state) => set({ selectedAvatarState: state }),
}))


type IUseModalState = {
	dropDownState: boolean;
	setDropDownState: (state: boolean) => void;
	openJumpingCardsList: string[];
	addJumpingCardState: (name: string) => void;
	removeJumpingCardState: (name: string) => void;
	getJumpingCardsState: () => boolean;
	snackBarState: boolean;
	setSnackBarState: (state: boolean) => void;
	getCommonModalState: () => boolean;
}
export const useModalState = create<IUseModalState>((set, get) => ({
	dropDownState: false,
	setDropDownState: (state) => set({ dropDownState: state }),

	openJumpingCardsList: [],
	addJumpingCardState: (name) => {
		const prevState = get().openJumpingCardsList
		if (prevState.includes(name)) {
			return
		}

		set({
			openJumpingCardsList: [...prevState, name],
		})
	},
	removeJumpingCardState: (name) => set({
		openJumpingCardsList: get().openJumpingCardsList.filter(el => el !== name),
	}),
	getJumpingCardsState: () => {
		return get().openJumpingCardsList.length !== 0
	},

	snackBarState: false,
	setSnackBarState: (state) => set({ snackBarState: state }),

	getCommonModalState: () => [get().dropDownState, get().getJumpingCardsState(), get().snackBarState].includes(true),
}))