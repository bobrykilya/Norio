import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { IUseClickOutside } from '@hooks/useClickOutside'
import { ICommonVar } from '@shared/types/Global-types'



type JumpingCardsStateOptions = {
	topCard: 'accountInfo' | 'userInfo' | 'organization' | null;
	bottomCard: 'avatarList' | 'logBook' | null;
}
type IUseTopCardState = {
	jumpingCardsState: JumpingCardsStateOptions;
	setJumpingCardsState: <T extends keyof JumpingCardsStateOptions>(card: T, state: JumpingCardsStateOptions[T]) => void;
	getJumpingCardsState: <T extends keyof JumpingCardsStateOptions>(card: T) => JumpingCardsStateOptions[T];
}
const jumpingCardsInitialState: JumpingCardsStateOptions = {
	topCard: null,
	bottomCard: null,
}
export const useJumpingCardsState = create<IUseTopCardState>()(immer(((set, get) => ({
	jumpingCardsState: jumpingCardsInitialState,
	setJumpingCardsState: <T extends keyof JumpingCardsStateOptions>(
		card: T,
		state: JumpingCardsStateOptions[T],
	) => {
		const { jumpingCardsState } = get()
		jumpingCardsState[card] = state
		set({ jumpingCardsState })
	},
	getJumpingCardsState: <T extends keyof JumpingCardsStateOptions>(
		card: T,
	) => get().jumpingCardsState[card],
}))))


// type IUseLogBookCardState = {
// 	logBookCardState: boolean;
// 	setLogBookCardState: (state: boolean) => void;
// }
// export const useLogBookCardState = create<IUseLogBookCardState>(set => ({
// 	logBookCardState: false,
// 	setLogBookCardState: (state) => set({ logBookCardState: state }),
// }))

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


// type IUseModalState = {
// 	dropDownState: boolean;
// 	setDropDownState: (state: boolean) => void;
// 	openJumpingCardsList: string[];
// 	addJumpingCardState: (name: string) => void;
// 	removeJumpingCardState: (name: string) => void;
// 	getJumpingCardsState: () => boolean;
// 	snackBarState: boolean;
// 	setSnackBarState: (state: boolean) => void;
// 	getCommonModalState: () => boolean;
// }
// export const useModalState = create<IUseModalState>((set, get) => ({
// 	dropDownState: false,
// 	setDropDownState: (state) => set({ dropDownState: state }),
//
// 	openJumpingCardsList: [],
// 	addJumpingCardState: (name) => {
// 		const prevState = get().openJumpingCardsList
// 		if (prevState.includes(name)) {
// 			return
// 		}
//
// 		set({
// 			openJumpingCardsList: [...prevState, name],
// 		})
// 	},
// 	removeJumpingCardState: (name) => set({
// 		openJumpingCardsList: get().openJumpingCardsList.filter(el => el !== name),
// 	}),
// 	getJumpingCardsState: () => {
// 		return get().openJumpingCardsList.length !== 0
// 	},
//
// 	snackBarState: false,
// 	setSnackBarState: (state) => set({ snackBarState: state }),
//
// 	getCommonModalState: () => [get().dropDownState, get().getJumpingCardsState(), get().snackBarState].includes(true),
// }))

type ModalOptions = 'dropDown' | 'jump' | 'unfold' | 'snack'
type IModal = {
	type: ModalOptions;
	callback: () => void;
	name?: string;
	clickOutsideParams?: Pick<IUseClickOutside, 'ref' | 'butRef'>
}
type IUseModalState = {
	modalStack: IModal[];
	addModal: (modal: IModal) => void;
	removeModal: (params?: Partial<Pick<IModal, 'type' | 'name'>>) => void;
	getTopModal: () => IModal;
	isModalOnTop: (name: string) => boolean;
	isModalStackEmpty: () => boolean;
	isJumpingCardOpened: () => boolean;
}
export const useModalState = create<IUseModalState>((set, get) => ({
	modalStack: [],

	addModal: (modal) => {
		const { modalStack } = get()
		if (modal.name &&
			modalStack.some(mod => mod.name === modal.name)) {
			return
		}
		set({ modalStack: [...modalStack, modal] })
	},
	removeModal: (params) => {
		const { modalStack } = get()
		if (modalStack.length > 0) {
			set({
				modalStack: params ?
					modalStack.slice(0, -1) :
					modalStack.filter(modal => {
						for (const [key, val] of Object.entries(params)) {
							if (modal[key] !== val) {
								return false
							}
						}

						return true
					}),
			})
		}
	},
	getTopModal: () => {
		const { modalStack } = get()
		return modalStack.length > 0 ? modalStack.at(-1) : null
	},
	isModalOnTop: (name) => {
		const { modalStack } = get()
		return modalStack.length > 0 ? modalStack.at(-1).name === name : false
	},
	isModalStackEmpty: () => get().modalStack.length === 0,
	isJumpingCardOpened: () => get().modalStack.some(mod => mod.type === 'jump'),
}))