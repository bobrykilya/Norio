import { create } from "zustand"



type IUseAnyCoverModalState = {
	isAnyCoverModalOpened: boolean;
	isAnyJumpingListOpened: boolean;
	setIsAnyCoverModalOpened: (state: boolean) => void;
	setIsAnyJumpingListOpened: (state: boolean) => void;
}
const useAnyCoverModalState = create<IUseAnyCoverModalState>(set => ({
	isAnyCoverModalOpened: false,
	isAnyJumpingListOpened: false,
	setIsAnyCoverModalOpened: (state) => set({ isAnyCoverModalOpened: state }),
	setIsAnyJumpingListOpened: (state) => set({ isAnyJumpingListOpened: state })
}))


type IUseLogBookListState = {
	isLogBookListOpened: boolean;
	setIsLogBookListOpened: (state: boolean) => void;
}
const useLogBookListState = create<IUseLogBookListState>(set => ({
	isLogBookListOpened: false,
	setIsLogBookListOpened: (state) => set({ isLogBookListOpened: state }),
}))



export {
	useAnyCoverModalState,
	useLogBookListState,
}