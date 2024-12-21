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
	setDeviceIdState: (id: number) => {
		const prev = get().deviceInfoState
		set({
			deviceInfoState: {
				...prev,
				id,
			},
		})
		localStorage.setItem('deviceInfo', JSON.stringify({ ...prev, id }))
	},
	setDeviceLocationState: (location: IDeviceLocation) => {
		const prev = get().deviceInfoState
		set({
			deviceInfoState: {
				...prev,
				location,
			},
		})
		localStorage.setItem('deviceInfo', JSON.stringify({ ...prev, location }))
	},
	setDeviceTypeState: (type: DeviceTypeOptions) => {
		const prev = get().deviceInfoState
		localStorage.setItem('deviceInfo', JSON.stringify({ ...prev, type }))
		set({
			deviceInfoState: {
				...prev,
				type,
			},
		})
	},
}))



export {
	useBlockError,
	useDeviceInfoState,
}