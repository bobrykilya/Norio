import { HoroscopeTypeOptions } from "./Global-types"
import {
	IUserInfoEditForm,
} from "../../client/src/components/others/JumpingCards/TopCard/EditForms/UserInfoEditForm/UserInfoEditForm"



export type IHoroscopeDataRes = {
	horoscopeType: HoroscopeTypeOptions;
	date: string;
	untilDeadTimeInSec: number;
	messages: string[];
}

export type IUserInfoEditReq =  Partial<Omit<IUserInfoEditForm, 'birthday'>> & {
	birthday?: string | number;
}