import { IUserInfo } from "./Auth-types";



export type IBlockDevice = {
    logTime: string;
    infinityBlock?: boolean;
    unlockTimeDB?: string | null;
    interCode?: number | null;
}

export type IBlockDeviceService = { 
    logTime: string;
    unlockTime: string | null;
    userInfo: IUserInfo;
    deviceId: number;
    interCode: number | null;
    deviceIP?: string;
}