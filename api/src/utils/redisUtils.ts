import { WEATHER_UPDATE_TIME_IN_MIN } from '@/../constants.ts'
import { redis } from '@/../server.ts'


// export const redisDisconnect = async () => await redis.disconnect()
// export const redisInfiniteSet = async (key: string, val: string) => await redis.set(key, val)
export const redisWeatherSet = async (key: string, val: object) => await redis.setEx(key, WEATHER_UPDATE_TIME_IN_MIN * 60, JSON.stringify(val))
export const redisHoroscopeSet = async (key: string, val: object, time: number) => await redis.setEx(key, time, JSON.stringify(val))
export const redisGet = async (key: string) => JSON.parse(await redis.get(key))
