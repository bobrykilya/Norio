import { create } from "zustand"
import { IDeviceInfo } from "../types/Device-types"
import { DeviceTypeOptions } from "../../../common/types/Global-types"
import { IDeviceLocation } from "../../../common/types/Device-types"



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
	setDeviceLocationState: (city: IDeviceLocation) => void;
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
	setDeviceLocationState: (location: IDeviceLocation) => set({ deviceInfoState: {
		...get().deviceInfoState,
		location
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