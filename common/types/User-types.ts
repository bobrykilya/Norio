import { HoroscopeTypeOptions } from "./Global-types"
import {
	IUserInfoEdit,
} from "../../client/src/components/others/AccountInfoCard/UserCard/EditCards/UserInfoEditCard/UserInfoEditCard"



export type IHoroscopeDataRes = {
	horoscopeType: HoroscopeTypeOptions;
	date: string;
	untilDeadTimeInSec: number;
	messages: string[];
}

export type IUserInfoEditReq =  Partial<Omit<IUserInfoEdit, 'birthday'>> & {
	birthday?: string | number;
}