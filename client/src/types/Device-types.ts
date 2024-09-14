export type IBlockDevice = {
    logTime: number;
    interCode: number;
    errMessage: string;
    unlockTime: number;
    // setBlockErrorMessage: (blockErrorMessage: string) => void,
}

export type IBlockDeviceService = { 
    logTime: number;
    userId: number | null;
    deviceId: number;
    interCode: number | null;
    deviceIP?: string;
}