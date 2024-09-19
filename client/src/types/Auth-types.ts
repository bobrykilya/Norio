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

type UserFormFields = {
    username: string;
    password: string;
    phone: string;
    store: string;
    job: string;
    last_name: string;
    first_name: string;
    middle_name: string;
}

export type IReactHookForm = {
    error?: any;
    reset?: any;
    watch?: any
    setError?: any;
    setValue?: any;
    register?: any;
}
export type ISignFormInput = IReactHookForm & {
    name: string;
    disabled: boolean;
    notSaveUser?: boolean;
    inputType?: AvailableSignFormInputTypes;
}

export type AvailableSignFormInputTypes = 'sign_in' | 'sign_up' | 'name' | 'confirm'

export type IUserNameInfo = {
	lastName: string; 
	firstName: string;
	username: string;
}