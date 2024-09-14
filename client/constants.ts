export const LOGOUT_STORAGE_KEY = "lastLogout"

//* Snack (err, warning, success) settings
	export const TOAST_LIMIT = 3 						//* Max toasts quantity limit

//* LocalErrStorage settings
	export const recentlyTime = 20 						//* Time of error counting in seconds
	export const sameErrsQuantity = 2 					//* Limit of possible error quantity recently
	export const localErrStorageTime = 24 				//* User error storage time in hours

//* Services settings
	export const CHECK_IP_AND_COUNTRY = false 			//* IP and Country checking before request on Api (ipapi.co, ip-api.com services)
	export const PERMITTED_COUNTRIES = ['BY', 'PL'] 	//* Permitted countries for working with app