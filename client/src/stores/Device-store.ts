import { create } from "zustand"
import { IDeviceInfo } from "../types/Device-types"
import { DeviceTypeOptions } from "../../../common/types/Global-types"
import { IDeviceLocation } from "../../../common/types/Device-types"
import { immer } from "zustand/middleware/immer"
import { DEVICE_LS } from "../../constants"
import { getLSObject, setLSObject } from "../utils/localStorage"



type IUseBlockErrorState = {
	blockErrorState: string;
	setBlockErrorState: (blockErrorMessage: string) => void;
}
const useBlockErrorState = create<IUseBlockErrorState>(set => ({
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
	deviceInfoState: getLSObject<IDeviceInfo>(DEVICE_LS),
	setDeviceInfoState: (state) => set({ deviceInfoState: state }),
	setDeviceIdState: (id: number) => {
		const deviceInfoState = get().deviceInfoState || {}
		deviceInfoState.id = id

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
	setDeviceTypeState: (type) => {
		const deviceInfoState = get().deviceInfoState || {}
		deviceInfoState.type = type

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
	setDeviceLocationState: (location) => {
		const deviceInfoState = get().deviceInfoState
		deviceInfoState.location = location

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
	setDeviceLocationTitleState: (title) => {
		const deviceInfoState = get().deviceInfoState
		deviceInfoState.location.city.title = title

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
})))



export {
	useBlockErrorState,
	useDeviceInfoState,
}