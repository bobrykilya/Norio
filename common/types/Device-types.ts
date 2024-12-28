import { DefaultCityOptions } from "./Global-types"



export type IDeviceLocation = {
	city?: {
		id: DefaultCityOptions | string;
		title: string;
	};
	coords?: {
		lat: number;
		lon: number;
	};
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
	forecastTimeInSec: number;
	forecastDeadTimeInSec: number;
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