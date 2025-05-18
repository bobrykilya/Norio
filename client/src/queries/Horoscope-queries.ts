import { queryClient } from '@/http/tanstackQuery-client'
import UserService from '@services/User-service'
import { HoroscopeTypeOptions } from '@shared/types/Global-types'
import { IHoroscopeDataRes } from '@shared/types/User-types'
import { queryOptions, useQuery, UseQueryResult } from '@tanstack/react-query'



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
	getHoroscopeQueryOptions,
	useFetchHoroscope,
}