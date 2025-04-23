import { DefaultCityOptions } from "./Global-types"



export type ILocationCoords = {
	lat: number;
	lon: number;
}
export type IDeviceLocation = {
	city?: {
		id: DefaultCityOptions | string;
		title: string;
	};
	coords?: ILocationCoords;
}
export type IDeviceLocationReq = {
	id?: IDeviceLocation['city']['id'];
	title?: IDeviceLocation['city']['title'];
	lat: ILocationCoords['lat'];
	lon: ILocationCoords['lon'];
}

export type IWeatherTempObj = {
	morn: number;
	day: number;
	eve: number;
	night: number;
}
export type ILocationWeatherElem = {
	dt: number;
	rain?: number;
	snow?: number;
	wind_gust?: number;
	temp: number | IWeatherTempObj & {
		min: number;
		max: number;
	};
	feels_like: number | IWeatherTempObj;
	humidity: number;
	description: string;
	icon: string;
}

export type ILocationWeather = {
	cityId: string;
	cityTitle: string;
	timeInSec: number;
	deadTimeInSec: number;
	current: ILocationWeatherElem;
	hourly: ILocationWeatherElem[];
	daily: ILocationWeatherElem[];
} | null

export type ILocationAddress = {
	address: {
		city?: string;
		town?: string;
		village?: string;
	}
}