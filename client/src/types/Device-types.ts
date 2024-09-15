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