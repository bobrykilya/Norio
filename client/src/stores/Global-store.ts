import { create } from "zustand"



type IUseModalState = {
	dropDownState: boolean;
	blurModalState: boolean;
	snackBarState: boolean;
	setDropDownState: (state: boolean) => void;
	setBlurModalState: (state: boolean) => void;
	setSnackBarState: (state: boolean) => void;
	getCommonModalState: () => boolean;
}
const useModalState = create<IUseModalState>((set, get) => ({
	dropDownState: false,
	blurModalState: false,
	snackBarState: false,
	setDropDownState: (state) => set({ dropDownState: state }),
	setBlurModalState: (state) => set({ blurModalState: state }),
	setSnackBarState: (state) => set({ snackBarState: state }),
	getCommonModalState: () => [get().dropDownState, get().blurModalState, get().snackBarState].includes(true),
}))



export {
	useModalState,
}