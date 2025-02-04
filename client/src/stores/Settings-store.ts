import { create } from "zustand"



type IUseLogBookCardState = {
	logBookCardState: boolean;
	setLogBookCardState: (state: boolean) => void;
}
const useLogBookCardState = create<IUseLogBookCardState>(set => ({
	logBookCardState: false,
	setLogBookCardState: (state) => set({ logBookCardState: state }),
}))

type IUseAvatarListCardState = {
	avatarListCardState: boolean;
	setAvatarListCardState: (status: boolean) => void;
}
const useAvatarListCardState = create<IUseAvatarListCardState>(set => ({
	avatarListCardState: false,
	setAvatarListCardState: (state) => set({ avatarListCardState: state }),
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
	useAvatarListCardState,
	useTopCardState,
}