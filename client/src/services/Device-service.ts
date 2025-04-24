import { $apiAuth, $apiUnprotected, getIPInfo } from '../http/http'
import { IBlockDeviceService } from '../types/Device-types'
import { showSnackMessage } from "../features/showSnackMessage/showSnackMessage"
import { IDeviceLocation, ILocationWeather } from "../../../common/types/Device-types"
import { WEATHER_ACCURACY } from "../../constants"



const getUserIPAddress = async () => {
    const res = await getIPInfo()

    if (!res) return undefined

    return res.ip
}

export const getCoord = (coord: number) => {
    return Number(coord.toFixed(WEATHER_ACCURACY))
}

export const handleLocationCoords = (prevData: IDeviceLocation) => {
    let data: IDeviceLocation = {
        ...prevData,
        coords: {
            lat: getCoord(prevData.coords.lat),
            lon: getCoord(prevData.coords.lon)
        }
    }

    return data
}

class DeviceService {
    static blockDeviceInDB = async (data: IBlockDeviceService) => {
        data.deviceIP = await getUserIPAddress()
        // console.log(data)

        try {
            await $apiAuth.post("block", { json: data }).json()

        } catch (err) {
            if (err.response?.status !== 900) {
                showSnackMessage({type: 'w', message: 'Device-service error'})
                throw new Error(`Device-service error: ${err}`)
            }
        }
    }

    static async getDeviceLocationWeather(location: IDeviceLocation, { signal }: { signal: AbortSignal }) {
        try {
            if (!location) return

            return await $apiUnprotected.get("weather", {
                searchParams: {
                    id: location.city.id,
                    title: location.city.title,
                    lat: location.coords.lat,
                    lon: location.coords.lon
                },
                signal,
            })?.json<ILocationWeather>()
        } catch (err) {
            if (err.name !== 'AbortError') {
                console.error(err)
            }
            throw new Error('getLocationWeather error')
        }
    }
}

export default DeviceService