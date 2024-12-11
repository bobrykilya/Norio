import { ICommonVar } from "../../../common/types/Global-types"



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
    location?: {
        city?: IDeviceCity;
        coords?: {
            lat: number;
            lon: number;
        }
    }
}

export type IDeviceCity = {
    id: string;
    title: string;
}