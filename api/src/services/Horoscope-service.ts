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
	// console.log('getDataFromPuppeteer')

	const horoscopeList = await page.evaluate(() => {
		// return document.querySelector(".be13d659a4")
		const list = document.querySelectorAll(".b6a5d4949c p")
		const result: string[] = []
		list.forEach(el => {
			result.push(el.textContent)
		})
		return result
	})

	await browser.close()

	return horoscopeList
}

const getCashKeyForHoroscope = (horoscopeType: HoroscopeTypeOptions) => {
	return `horoscope-${horoscopeType}`
}

class HoroscopeService {

	static async getHoroscopeData(horoscopeType: HoroscopeTypeOptions) {
		// console.log(horoscopeType)
		let horoscope: IHoroscopeDataRes

		horoscope = await redisGet(getCashKeyForHoroscope(horoscopeType))
		if (!horoscope || horoscope?.date !== getDateInShortString(getTime())) {
			const messages = await getDataFromPuppeteer(`${$apiHoroscope}/${horoscopeType}/today/`)

			const untilDeadTimeInSec = getTimeToNextDayInSec()
			horoscope = {
				horoscopeType,
				date: getDateInShortString(getTime()),
				untilDeadTimeInSec,
				messages,
			}

			await redisHoroscopeSet(getCashKeyForHoroscope(horoscopeType), horoscope, untilDeadTimeInSec)
		}
		// console.log(horoscope)

		return horoscope
	}
}

export default HoroscopeService
