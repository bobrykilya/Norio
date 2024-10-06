import { ICommonVar } from "./Global-types"
import { IUserRepository } from "../../api/src/types/DB-types"


//* Request types
export type ISignInReq = {
	username: ICommonVar['username'];
	password: ICommonVar['password'];
	fastSession?: ICommonVar['fastSession'];
}

export type ICheckUserReq = {
	username: ICommonVar['username'];
	password: ICommonVar['password'];
}

export type ISignUp = {
	phone: ICommonVar['phone'];
	store: ICommonVar['store'];
	job: ICommonVar['job'];
	lastName: ICommonVar['lastName'];
	firstName: ICommonVar['firstName'];
	middleName: ICommonVar['middleName'];
	avatar: ICommonVar['avatar'];
}
export type ISignUpReq = ISignUp & {
	username: string;
	hashedPassword: string;
}

export type ILogOutReq = {
	interCode?: ICommonVar['interCode'];
}

export type IRefreshReq = {
	lsDeviceId?: ICommonVar['lsDeviceId'];
}

export type IPreprocessing = {
	deviceIP?: ICommonVar['deviceIP'];
	lsDeviceId?: ICommonVar['lsDeviceId'];
	deviceId?: ICommonVar['deviceId'];
	deviceType?: ICommonVar['deviceType'];
}


//* Response types
export type ILoginServiceRes = {
	accessToken: ICommonVar['accessToken'];
	accessTokenExpiration: ICommonVar['accessTokenExpiration'];
	userInfo: IUserRepository;
	deviceId: ICommonVar['deviceId'];
}

export type ICheckUserRes = {
	username: ICommonVar['username'];
	hashedPassword: ICommonVar['hashedPassword'];
	avatarsList: ICommonVar['IAvatarListElement'][];
}




