export type AvailableCoverPanel = 'sign_in' | 'sign_up' | 'sign_up_info'

export interface IHandleSignIn {
    username: string;
    password: string;
    fastSession?: boolean;
}

export interface IResponseLoginService {
    accessToken: string; 
    accessTokenExpiration: number; 
    logOutTime?: Date; 
    userInfo: ILSUserInfo; 
    deviceId: number;
}

export interface IHandleCheckUser {
    username: string; 
    password: string;
}

export interface ICheckUserService {
    userName: string;
    hashedPassword: string;
    avatarsList: { title: string }[];
}

export interface IUserInfo {
    user_id: number;
    username?: string | null;
    hashedPassword?: string | null;
    last_name: string;
    first_name: string;
    middle_name: string;
    job: string;
    store: string;
    phone: string;
    avatar: string;
    is_store: boolean;
}

export interface ILSUserInfo extends IUserInfo {
    username: string;
}

export interface IResponseRefreshService extends IResponseLoginService {
    unlockTime?: Date;
}