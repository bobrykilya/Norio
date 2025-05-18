import { IDeviceLocation } from '@shared/types/Device-types'
import { ICommonVar } from '@shared/types/Global-types'



export type IBlockDevice = {
	errMessage: string;
	unlockTime: number;
}

export type IBlockDeviceService = {
	logTime: number;
	userId: number | null;
	deviceId: number;
	interCode: number | null;
	deviceIP?: string;
}

export type IDeviceInfo = {
	id?: ICommonVar['deviceId'];
	type?: ICommonVar['deviceType'];
	location?: IDeviceLocation;
}