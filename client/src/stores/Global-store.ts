import { create } from "zustand"



type IUseAnyJumpingListState = {
	isAnyJumpingListOpened: boolean;
	setIsAnyJumpingListOpened: (state: boolean) => void;
}
const useAnyJumpingListState = create<IUseAnyJumpingListState>(set => ({
	isAnyJumpingListOpened: false,
	setIsAnyJumpingListOpened: (state: boolean) => set({ isAnyJumpingListOpened: state })
}))


type IUseAnyCoverModalState = {
	isAnyCoverModalOpened: boolean;
	setIsAnyCoverModalOpened: (state: boolean) => void;
}
const useAnyCoverModalState = create<IUseAnyCoverModalState>(set => ({
	isAnyCoverModalOpened: false,
	setIsAnyCoverModalOpened: (state: boolean) => set({ isAnyCoverModalOpened: state })
}))

export {
	useAnyJumpingListState,
	useAnyCoverModalState,
}