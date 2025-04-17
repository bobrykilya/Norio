import { IBlockMessage } from "../../api/src/types/Device-types"
import { ExpressReq, ExpressRes } from "../../api/src/types/Global-types"
import { IJWTPayload } from "../../api/src/services/Token-service"
// @ts-ignore
import React from "react"
import { IUseClickOutside } from "../../client/src/hooks/useClickOutside"
import { IUseCloseOnEsc } from "../../client/src/hooks/useCloseOnEsc"



export type OmitBy<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type ICloseHooksParams = IUseCloseOnEsc & Partial<Pick<IUseClickOutside, 'ref' | 'butRef'>>


export type TimeType = number;
export type DeviceTypeOptions = 'Tablet' | 'Mobile' | 'Desktop' | 'Unknown';
export type SnackBarTypeOptions = 'e' | 'i' |'w' | 'b' | 's';
export type DefaultCityOptions = 'krasnaye' | 'polatsk' | 'turly' | 'hlybokaye' | 'radashkovichy' | 'maladzyechna';
export type DurationTypeOptions = 'second' | 'minute' | 'hour' | null;
export type HoroscopeTypeOptions = 'capricorn' | 'aquarius' | 'pisces' | 'aries' | 'taurus' | 'gemini' | 'cancer' |
	'leo' | 'virgo' | 'libra' | 'scorpio' | 'sagittarius';

export type ICommonVar = {
	username: string;
	password: string;
	hashedPassword: ICommonVar['password'];
	phone: string;
	store: string;
	job: string;
	lastName: string;
	firstName: string;
	middleName: string;
	avatar: string;
	isStore: boolean;
	company: string;
	birthday: number;
	gender: 'male' | 'female';
	fastSession: boolean;
	id: number;
	userId: ICommonVar['id'];
	deviceId: ICommonVar['id'];
	blockId: ICommonVar['id'];
	sessionId: ICommonVar['id'];
	interCode: number;
	lockTime: TimeType;
	queryTime: TimeType;
	unlockTime: TimeType;
	logTime: TimeType;
	deviceIP: string;
	lsDeviceId: ICommonVar['deviceId'];
	deviceType: DeviceTypeOptions;
	fingerprint: {
		hash: string;
		components: {
			useragent: {
				browser: {
					family: string;
					version: string;
				}
				os: {
					family: string;
					major: string;
				}
			}
		}
	};
	fingerprintHash: string;
	refreshToken: string;
	accessToken: string;
	accessTokenExpiration: number;
	payload: IJWTPayload | {
		userId: ICommonVar['userId'];
		username: ICommonVar['username'];
		deviceId: ICommonVar['deviceId'];
	};
	icon: React.ReactElement;

	//* ---------- Errors
	status: number;
	req: ExpressReq & {
		user: string | IJWTPayload;
		route: {
			stack?: {
				name: string;
			}[];
		}
		_body: boolean;
		body?: {
			username: ICommonVar['username'];
			password: ICommonVar['password'];
			hashedPassword: ICommonVar['hashedPassword'];
			fastSession: ICommonVar['fastSession'];
			deviceIP: ICommonVar['deviceIP'];
			deviceId: ICommonVar['deviceId'];
			lsDeviceId: ICommonVar['lsDeviceId'];
			deviceType: ICommonVar['deviceType'];
			phone: ICommonVar['phone'];
			store: ICommonVar['store'];
			job: ICommonVar['job'];
			lastName: ICommonVar['lastName'];
			firstName: ICommonVar['firstName'];
			middleName: ICommonVar['middleName'];
			avatar: ICommonVar['avatar'];
			interCode: ICommonVar['interCode'];
			logTime: ICommonVar['logTime'];
			userId: ICommonVar['userId'];
		};
		cookies: {
			// refreshToken: string;
		}
		fingerprint: ICommonVar['fingerprint'];
	}
	res: ExpressRes;
	err: {
		message?: string | IBlockMessage;
		detail?: IConflictDetail;
		status: ICommonVar['status'];
		title: string;
	}
}

export type IConflictDetail = {
	constraint: string;
	extraMessage: string;
}

export type ISnack = {
	type: SnackBarTypeOptions;
	message: string;
	messageTitle?: string;
	snackTime?: number;
	durationInSec?: number;
	response?: Response;
	detail?: {
		action: string;
		req: Record<string, any>;
		res: {
			status: number;
			title: string;
			unlockTime?: number;
			interCode?: number;
			description?: string;
			constraint?: string;
			extraMessage?: string;
		}
	}
}