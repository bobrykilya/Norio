import { queryOptions, useQuery, UseQueryResult } from "@tanstack/react-query"
import { IDeviceLocation, ILocationWeather } from "../../../common/types/Device-types"
import { getTime } from "../utils/getTime"
import { queryClient } from "../http/tanstackQuery-client"
import DeviceService from "../services/Device-service"



const getWeatherQueryOptions = (location?: IDeviceLocation) => {

	return queryOptions({
		queryKey: ['weather', location?.coords?.lat, location?.coords?.lon],
		queryFn: async (meta) => {
			return await DeviceService.getDeviceLocationWeather(location, meta)
		},
	})
}


const useFetchWeather = (location: IDeviceLocation, options?: { enabled: boolean }) => {
	let cashedData: ILocationWeather
	let forecastUntilDeadTime = 0
	
	if (location) {
		cashedData = queryClient.getQueryData(getWeatherQueryOptions(location).queryKey)
		forecastUntilDeadTime = (cashedData?.forecastDeadTimeInSec - getTime()) * 1000
	}

	return useQuery({
		...getWeatherQueryOptions(location),
		staleTime: forecastUntilDeadTime,
		refetchInterval: forecastUntilDeadTime,
		...options,
	}) as UseQueryResult<ILocationWeather>
}

// const useMutateWeather = () => {
// 	const queryClient = useQueryClient()
//
// 	return useMutation(functionName, {
// 		onSettled: async () => {
// 			await queryClient.invalidateQueries(['weather'])
// 		}
// 	})
// }


export {
	useFetchWeather,
	getWeatherQueryOptions
}