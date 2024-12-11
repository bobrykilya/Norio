import { create } from "zustand"
import { IDeviceCity, IDeviceInfo } from "../types/Device-types"
import { DeviceTypeOptions } from "../../../common/types/Global-types"
// import { persist } from "zustand/middleware"



type IUseBlockError = {
	blockErrorMessage: string;
	setBlockErrorMessage: (blockErrorMessage: string) => void;
}
const useBlockError = create<IUseBlockError>((set) => ({
	blockErrorMessage: '',
	setBlockErrorMessage: (blockErrorMessage: string) => set({ blockErrorMessage: blockErrorMessage }),
}))


type IUseDeviceInfoState = {
	deviceInfoState: IDeviceInfo
	setDeviceInfoState: (state: IDeviceInfo) => void;
	setDeviceIdState: (id: number) => void;
	setDeviceCityState: (city: IDeviceCity) => void;
	setDeviceTypeState: (type: DeviceTypeOptions) => void;
}
const deviceInfo: IDeviceInfo = JSON.parse(localStorage.getItem('deviceInfo'))
const useDeviceInfoState = create<IUseDeviceInfoState>((set, get) => ({
	deviceInfoState: deviceInfo,
	setDeviceInfoState: (state: IDeviceInfo) => set({ deviceInfoState: state }),
	setDeviceIdState: (id: number) => set({ deviceInfoState: {
			...get().deviceInfoState,
			id
		} }),
	setDeviceCityState: (city: IDeviceCity) => set({ deviceInfoState: {
		...get().deviceInfoState,
		location: {
			city
		}
	} }),
	setDeviceTypeState: (type: DeviceTypeOptions) => set({ deviceInfoState: {
		...get().deviceInfoState,
		type
	} }),
}))



export {
	useBlockError,
	useDeviceInfoState,
}