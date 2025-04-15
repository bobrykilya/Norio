import { HoroscopeTypeOptions } from "./Global-types"
import {
	IUserInfoEditForm,
} from "../../client/src/components/others/AccountInfoCard/UserCard/EditCards/UserInfoEditCard/UserInfoEditCard"



export type IHoroscopeDataRes = {
	horoscopeType: HoroscopeTypeOptions;
	date: string;
	untilDeadTimeInSec: number;
	messages: string[];
}

export type IUserInfoEditReq =  Partial<Omit<IUserInfoEditForm, 'birthday'>> & {
	birthday?: string | number;
}