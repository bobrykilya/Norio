import ky from "ky"



const $apiWeather = ky.extend({
	prefixUrl: `https://api.openweathermap.org/data/3.0`,
	searchParams: {
		appid: process.env.API_WEATHER_KEY,
		exclude: 'minutely,alerts',
		units: 'metric',
		lang: 'ru',
	},
})

const $apiLocation = ky.extend({
	prefixUrl: `https://us1.locationiq.com/v1`,
	searchParams: {
		key: process.env.API_LOCATION_KEY,
		format: 'json',
		language: 'en',
	},
})

export {
	$apiWeather,
	$apiLocation,
}
