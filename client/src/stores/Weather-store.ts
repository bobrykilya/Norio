import { create } from "zustand"
// import { persist } from "zustand/middleware"



type IUseAvatarListState = {
	isAvatarListOpened: boolean;
	setIsAvatarListOpened: (status: boolean) => void;
}
const useWeather = create<IUseAvatarListState>(set => ({
	isAvatarListOpened: false,
	setIsAvatarListOpened: (state: boolean) => set({ isAvatarListOpened: state }),
}))

export {
	useWeather,
}