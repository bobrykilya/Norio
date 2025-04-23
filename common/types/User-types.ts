import { HoroscopeTypeOptions, ICommonVar } from "./Global-types"
import {
	IUserInfoEditForm,
} from "../../client/src/components/others/JumpingCards/TopCard/EditForms/UserInfoEditForm/UserInfoEditForm"
import {
	IAccountInfoEditForm,
} from "../../client/src/components/others/JumpingCards/TopCard/EditForms/AccountInfoEditForm/AccountInfoEditForm"



export type IHoroscopeDataRes = {
	horoscopeType: HoroscopeTypeOptions;
	date: string;
	untilDeadTimeInSec: number;
	messages: string[];
}

export type IUserInfoEditReq =  Partial<Omit<IUserInfoEditForm, 'birthday'>> & {
	birthday?: string | ICommonVar['birthday'];
}

export type IAccountInfoEditReq =  Partial<IAccountInfoEditForm> & {
	avatar?: ICommonVar['avatar'];
	password?: ICommonVar['password'];
}