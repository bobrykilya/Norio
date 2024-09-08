import {IUserInfo} from "./Auth-types";


export type IBlockDevice = {
    logTime: number;
    infinityBlock?: boolean;
    unlockTimeDB?: number | null;
    interCode?: number | null;
}

export type IBlockDeviceService = { 
    logTime: number;
    unlockTime: number | null;
    userInfo: IUserInfo;
    deviceId: number;
    interCode: number | null;
    deviceIP?: string;
}