import { HoroscopeTypeOptions } from "./Global-types"



export type IHoroscopeParseDataRes = {

}
export type IHoroscopeDataRes = {
	horoscopeType: HoroscopeTypeOptions;
	date: string;
	untilDeadTimeInSec: number;
	message: string;
}