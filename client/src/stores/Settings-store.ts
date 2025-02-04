import { create } from "zustand"



type IUseLogBookCardState = {
	logBookCardState: boolean;
	setLogBookCardState: (state: boolean) => void;
}
const useLogBookCardState = create<IUseLogBookCardState>(set => ({
	logBookCardState: false,
	setLogBookCardState: (state) => set({ logBookCardState: state }),
}))

type IUseAvatarListState = {
	avatarListState: boolean;
	setAvatarListState: (status: boolean) => void;
}
const useAvatarListState = create<IUseAvatarListState>(set => ({
	avatarListState: false,
	setAvatarListState: (state) => set({ avatarListState: state }),
}))

type IUseTopCardState = {
	topCardState: boolean;
	setTopCardState: (status: boolean) => void;
}
const useTopCardState = create<IUseTopCardState>(set => ({
	topCardState: false,
	setTopCardState: (state) => set({ topCardState: state }),
}))



export {
	useLogBookCardState,
	useAvatarListState,
	useTopCardState,
}