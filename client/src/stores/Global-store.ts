import { create } from "zustand"



type IUseModalState = {
	dropDownState: boolean;
	blurModalState: boolean;
	snackBarState: boolean;
	setDropDownState: (state: boolean) => void;
	setBlurModalState: (state: boolean) => void;
	setSnackBarState: (state: boolean) => void;
	allModalsState: () => boolean;
}
const useModalState = create<IUseModalState>((set, get) => ({
	dropDownState: false,
	blurModalState: false,
	snackBarState: false,
	setDropDownState: (state) => set({ dropDownState: state }),
	setBlurModalState: (state) => set({ blurModalState: state }),
	setSnackBarState: (state) => set({ snackBarState: state }),
	allModalsState: () => ![get().dropDownState, get().blurModalState, get().snackBarState].includes(false),
}))



export {
	useModalState,
}