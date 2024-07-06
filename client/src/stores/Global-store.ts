import { create } from "zustand"
// import { persist } from "zustand/middleware"



export const useLogList = create((set) => ({
    isErrorsLogListOpened: false,
    setIsErrorsLogListOpened: (logListState: boolean) => set({ isErrorsLogListOpened: logListState })
}))


interface IUseBlockError {
    blockErrorMessage: string;
    setBlockErrorMessage: (blockErrorMessage: string) => void;
}
export const useBlockError = create<IUseBlockError>((set) => ({
    blockErrorMessage: '',
    setBlockErrorMessage: (blockErrorMessage: string) => set({ blockErrorMessage: blockErrorMessage }),
}))