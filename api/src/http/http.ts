import ky from "ky"
import dotenv from "dotenv"
import { APP_LANG } from "../../../client/constants.ts"



dotenv.config()

const $apiWeather = ky.extend({
	prefixUrl: `https://api.openweathermap.org/data/3.0`,
	searchParams: {
		appid: process.env.API_WEATHER_KEY,
		exclude: 'minutely,alerts',
		units: 'metric',
		lang: APP_LANG,
	},
})

const $apiLocation = ky.extend({
	prefixUrl: `https://us1.locationiq.com/v1`,
	searchParams: {
		key: process.env.API_LOCATION_KEY,
		format: 'json',
		language: APP_LANG,
	},
	headers: {
		'Accept-Language': APP_LANG
	}
})

const $apiHoroscope = 'https://horo.mail.ru/prediction'

export {
	$apiWeather,
	$apiLocation,
	$apiHoroscope,
}
