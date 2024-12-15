export type IDeviceLocation = {
	city?: {
		id: string;
		title: string;
	};
	coords?: {
		lat: number;
		lon: number;
	};
}
export type ILocationWeatherElem = {
	dt: number;
	rain?: number;
	snow?: number;
	temp: number | {
		morn: number;
		day: number;
		eve: number;
		night: number;
		min: number;
		max: number;
	};
	feels_like: number | {
		morn: number;
		day: number;
		eve: number;
		night: number;
	};
	humidity: number;
	description: string;
	icon: string;
}
export type ILocationWeather = {
	current: ILocationWeatherElem;
	hourly: ILocationWeatherElem[];
	daily: ILocationWeatherElem[];
} | null