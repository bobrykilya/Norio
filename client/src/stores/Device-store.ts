import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { DEVICE_LS } from '../../constants'
import { IDeviceLocation } from '@shared/types/Device-types'
import { DeviceTypeOptions } from '@shared/types/Global-types'
import { IDeviceInfo } from '@type/Device-types'
import { getLSObject, setLSObject } from '@utils/localStorage'



type IUseBlockErrorState = {
	blockErrorMessage: string;
	setBlockErrorState: (blockErrorMessage: string) => void;
	isAppBlocked: () => boolean;
}
const useBlockErrorState = create<IUseBlockErrorState>((set, get) => ({
	blockErrorMessage: '',
	setBlockErrorState: (blockErrorMessage: string) => set({ blockErrorMessage: blockErrorMessage }),
	isAppBlocked: () => Boolean(get().blockErrorMessage),
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
		const { deviceInfoState } = get()
		deviceInfoState.id = id

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
	setDeviceTypeState: (type) => {
		const { deviceInfoState } = get()
		deviceInfoState.type = type

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
	setDeviceLocationState: (location) => {
		const { deviceInfoState } = get()
		deviceInfoState.location = location

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
	setDeviceLocationTitleState: (title) => {
		const { deviceInfoState } = get()
		deviceInfoState.location.city.title = title

		set({ deviceInfoState })
		setLSObject(DEVICE_LS, deviceInfoState)
	},
})))


export {
	useBlockErrorState,
	useDeviceInfoState,
}