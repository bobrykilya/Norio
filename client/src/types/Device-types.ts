import { ILSUserInfo } from "./Auth-types";



export interface IBlockDevice {
    logTime?: string;
    infinityBlock?: boolean;
    unlockTimeDB?: string | null;
    interCode?: number | null;
}

export interface IBlockDeviceService { 
    logTime: string;
    unlockTime: string | null;
    userInfo: ILSUserInfo;
    deviceId: number;
    interCode: number | null;
    deviceIP?: string;
}