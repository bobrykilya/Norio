import { IUserRepository } from "../../../api/src/types/DB-types"
import { create } from "zustand"



type IUseUserInfoState = {
	userInfoState: IUserRepository | null;
	setUserInfoState: (state: IUserRepository) => void;
}
export const useUserInfoState = create<IUseUserInfoState>(set => ({
	userInfoState: null,
	setUserInfoState: (state) => set({ userInfoState: state })
}))