import ky from "ky"



const $apiWeather = ky.extend({
	prefixUrl: `https://api.openweathermap.org/data/3.0`,
	searchParams: {
		exclude: 'minutely,alerts',
		units: 'metric',
		lang: 'ru',
		appid: process.env.API_WEATHER_KEY,
	},
})

export {
	$apiWeather,

}
