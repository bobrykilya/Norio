import { FieldErrors, UseFormProps, UseFormRegister, UseFormResetField } from 'react-hook-form'



export type CoverPanelOptions = 'sign_in' | 'sign_up' | 'sign_up_info';

export type IAvatarListElement = { 
    title: string;
}

export type IHandleSignIn = {
    username: string;
    password: string;
    fastSession?: boolean;
}

export type ILoginServiceResp = {
    accessToken: string; 
    accessTokenExpiration: number; 
    userInfo: IUserInfo; 
    deviceId: number;
}

export type IHandleCheckUser = {
    username: string; 
    password: string;
}

export type ICheckUserServiceResp = {
    userName: string;
    hashedPassword: string;
    avatarsList: IAvatarListElement[];
}

export type IHandleSignUp = {
    phone: string;
    store: string;
    job: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    avatar: string;
}
export type ISignUpServiceReq = IHandleSignUp & {
    username: string;
    hashedPassword: string;
}

export type IUserInfo = IHandleSignUp & {
    user_id: number;
    username: string;
}

export type IHandleLogOut = { 
    interCode?: number;
}

type ISignFormInput = {
    name: string;
    register: UseFormRegister<TFieldValues>;
    error: FieldErrors<TFieldValues>;
    reset: UseFormResetField<UseFormProps>;
    disabled: boolean;
}
export type ISignFormStringInput = ISignFormInput & {
    type: AvailableSignFromTypes;
    notSaveUser: boolean;
}
export type AvailableSignFromTypes = 'sign_in' | 'sign_up' | 'name'

export type IUserNameInfo = {
	lastName: string; 
	firstName: string;
	username: string;
}