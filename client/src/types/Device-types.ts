import { ICommonVar } from "../../../common/types/Global-types"
import { IDeviceLocation } from "../../../common/types/Device-types"



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