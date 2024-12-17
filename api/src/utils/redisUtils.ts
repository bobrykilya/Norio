import { redis } from "../../server.ts"
import { WEATHER_UPDATE_TIME } from "../../constants.ts"



const redisDisconnect = async () => await redis.disconnect()
const redisInfiniteSet = async (key: string, val: string) => await redis.set(key, val)
const redisWeatherSet = async (key: string, val: object) => await redis.setEx(key, WEATHER_UPDATE_TIME * 60, JSON.stringify(val))
const redisGet = async (key: string) => {
	try {
		return JSON.parse(await redis.get(key))
	}
	catch (e) {
		console.log(e);
	}

}


export {
	redisDisconnect,
	redisInfiniteSet,
	redisWeatherSet,
	redisGet,
}
