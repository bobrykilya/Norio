import { UserStatusOptions } from './Global-types'
import { ICommonVar, TimeType } from '@shared/types/Global-types'



export type IUserRepository = {
	userId?: ICommonVar['userId'];
	username: ICommonVar['username'];
	hashedPassword: ICommonVar['hashedPassword'];
	role: number;
	status: UserStatusOptions;
	phone: ICommonVar['phone'];
	store: ICommonVar['store'];
	job: ICommonVar['job'];
	lastName: ICommonVar['lastName'];
	firstName: ICommonVar['firstName'];
	middleName: ICommonVar['middleName'];
	avatar: ICommonVar['avatar'];
	isStore: ICommonVar['isStore'];
	company?: ICommonVar['company'];
	birthday?: ICommonVar['birthday'];
	gender?: ICommonVar['gender'];
	email?: ICommonVar['email'];
}

export type IAuthDeviceRepository = {
	deviceId?: ICommonVar['deviceId'];
	deviceIP?: ICommonVar['deviceIP'];
	fingerprint: ICommonVar['fingerprint'];
	regTime: TimeType;
	deviceType: ICommonVar['deviceType'];
	// browser?: string;
	bVersion?: string;
}

export type IBlockRepository = {
	blockId?: ICommonVar['blockId'];
	interCode: ICommonVar['interCode'];
	deviceId: ICommonVar['deviceId'];
	userId: ICommonVar['userId'];
	lockTime: ICommonVar['lockTime'];
	unlockTime: ICommonVar['unlockTime'];
	deviceIP: ICommonVar['deviceIP'];
	fingerprintHash: ICommonVar['fingerprintHash'];
	status?: boolean;
}

export type IRefreshSessionRepository = {
	sessionId?: ICommonVar['sessionId'];
	userId: ICommonVar['userId'];
	deviceId: ICommonVar['deviceId'];
	refreshToken: ICommonVar['refreshToken'];
	logInTime: TimeType;
	logOutTime?: TimeType;
}

export type ILogRepository = {
	interCode: ICommonVar['interCode'];
	userId: ICommonVar['userId'];
	deviceId: ICommonVar['deviceId'];
	logTime: ICommonVar['logTime'];
}

export type ILogErrorRepository = ILogRepository & {
	req: ICommonVar['req'];
	res: ICommonVar['res'];
	err: ICommonVar['err'];
}
