import { IUserInfo } from "./Auth-types";



export interface IBlockDevice {
    logTime: string;
    infinityBlock?: boolean;
    unlockTimeDB?: string | null;
    interCode?: number | null;
}

export interface IBlockDeviceService { 
    logTime: string;
    unlockTime: string | null;
    userInfo: IUserInfo;
    deviceId: number;
    interCode: number | null;
    deviceIP?: string;
}