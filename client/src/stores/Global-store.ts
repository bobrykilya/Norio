import { create } from "zustand"



type IUseModalState = {
	modalState: boolean;
	blurModalState: boolean;
	setModalState: (state: boolean) => void;
	setBlurModalState: (state: boolean) => void;
}
const useModalState = create<IUseModalState>(set => ({
	modalState: false,
	blurModalState: false,
	setModalState: (state) => set({ modalState: state }),
	setBlurModalState: (state) => set({ blurModalState: state })
}))


type IUseLogBookListState = {
	logBookListState: boolean;
	setLogBookListState: (state: boolean) => void;
}
const useLogBookListState = create<IUseLogBookListState>(set => ({
	logBookListState: false,
	setLogBookListState: (state) => set({ logBookListState: state }),
}))


export {
	useModalState,
	useLogBookListState,
}