import { create } from "zustand"
import { IDeviceInfo } from "../types/Device-types"
import { DeviceTypeOptions } from "../../../common/types/Global-types"
import { IDeviceLocation } from "../../../common/types/Device-types"
import { immer } from "zustand/middleware/immer"



type IUseBlockErrorState = {
	blockErrorState: string;
	setBlockErrorState: (blockErrorMessage: string) => void;
}
const useBlockErrorState = create<IUseBlockErrorState>((set) => ({
	blockErrorState: '',
	setBlockErrorState: (blockErrorMessage: string) => set({ blockErrorState: blockErrorMessage }),
}))


type IUseDeviceInfoState = {
	deviceInfoState: IDeviceInfo;
	setDeviceInfoState: (state: IDeviceInfo) => void;
	setDeviceIdState: (id: number) => void;
	setDeviceTypeState: (type: DeviceTypeOptions) => void;
	setDeviceLocationState: (location: IDeviceLocation) => void;
	setDeviceLocationTitleState: (title: IDeviceLocation['city']['title']) => void;
}
const useDeviceInfoState = create<IUseDeviceInfoState>()(immer((set, get) => ({
	deviceInfoState: JSON.parse(localStorage.getItem('deviceInfo')),
	setDeviceInfoState: (state) => set({ deviceInfoState: state }),
	setDeviceIdState: (id: number) => {
		const deviceInfoState = get().deviceInfoState || {}
		deviceInfoState.id = id

		set({ deviceInfoState })
		localStorage.setItem('deviceInfo', JSON.stringify(deviceInfoState))
	},
	setDeviceTypeState: (type) => {
		const deviceInfoState = get().deviceInfoState || {}
		deviceInfoState.type = type

		set({ deviceInfoState })
		localStorage.setItem('deviceInfo', JSON.stringify(deviceInfoState))
	},
	setDeviceLocationState: (location) => {
		const deviceInfoState = get().deviceInfoState
		deviceInfoState.location = location

		set({ deviceInfoState })
		localStorage.setItem('deviceInfo', JSON.stringify(deviceInfoState))
	},
	setDeviceLocationTitleState: (title) => {
		const deviceInfoState = get().deviceInfoState
		deviceInfoState.location.city.title = title

		set({ deviceInfoState })
		localStorage.setItem('deviceInfo', JSON.stringify(deviceInfoState))
	},
})))



export {
	useBlockErrorState,
	useDeviceInfoState,
}