import { redisGet, redisHoroscopeSet } from "../utils/redisUtils.ts"
import { HoroscopeTypeOptions } from "../../../common/types/Global-types.ts"
import puppeteer from "puppeteer"
import { IHoroscopeDataRes } from "../../../common/types/User-types.ts"
import { getDateInShortString, getTime, getTimeToNextDayInSec } from "../utils/getTime.ts"
import { $apiHoroscope } from "../http/http.ts"



const getDataFromPuppeteer = async (url: string) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url)

	const horoscope = await page.evaluate(() => {
		return document.querySelector(".be13d659a4").textContent
	})

	await browser.close()

	return horoscope
}

class HoroscopeService {

	static async getHoroscopeData(horoscopeType: HoroscopeTypeOptions) {

		let horoscope: IHoroscopeDataRes

		horoscope = await redisGet(horoscopeType)
		if (!horoscope || horoscope?.date !== getDateInShortString(getTime())) {
			const message = await getDataFromPuppeteer(`${$apiHoroscope}/${horoscopeType}/today/`)

			const untilDeadTimeInSec = getTimeToNextDayInSec()
			horoscope = {
				horoscopeType,
				date: getDateInShortString(getTime()),
				untilDeadTimeInSec,
				message,
			}

			await redisHoroscopeSet(horoscopeType, horoscope, untilDeadTimeInSec)
		}
		// console.log(horoscope)

		return horoscope
	}
}

export default HoroscopeService
