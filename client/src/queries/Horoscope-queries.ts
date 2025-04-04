import { queryOptions, useQuery, UseQueryResult } from "@tanstack/react-query"
import { queryClient } from "../http/tanstackQuery-client"
import { HoroscopeTypeOptions } from "../../../common/types/Global-types"
import UserService from "../services/User-service"
import { IHoroscopeDataRes } from "../../../common/types/User-types"



const getHoroscopeQueryOptions = (horoscopeType: HoroscopeTypeOptions) => {

	return queryOptions({
		queryKey: ['horoscope', horoscopeType],
		queryFn: async (meta) => {
			return await UserService.getHoroscopeData(horoscopeType, meta)
		},
	})
}


const useFetchHoroscope = (horoscopeType: HoroscopeTypeOptions, options?: { enabled: boolean }) => {
	let cashedData: IHoroscopeDataRes
	let untilDeadTime = 0

	if (horoscopeType) {
		cashedData = queryClient.getQueryData(getHoroscopeQueryOptions(horoscopeType).queryKey)
		// console.log('cashedData', cashedData)
		untilDeadTime = cashedData?.untilDeadTimeInSec * 1000
	}

	return useQuery({
		...getHoroscopeQueryOptions(horoscopeType),
		staleTime: untilDeadTime,
		refetchInterval: untilDeadTime,
		...options,
	}) as UseQueryResult<IHoroscopeDataRes>
}



export {
	useFetchHoroscope,
	getHoroscopeQueryOptions
}