import { DefaultCityOptions } from '@shared/types/Global-types'



export type SizeOptions = 'xs' | 's' | 'm' | 'l';

export type IDataListElement = {
	id: string;
	title: string;
}
export type IStoresListElement = IDataListElement & {
	cityId?: DefaultCityOptions;
}