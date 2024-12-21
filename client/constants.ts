export const LOGOUT_STORAGE_KEY = 'lastLogout'
export const APP_TITLE = 'NORIO'

//* Snack (err, warning, success) settings
	export const TOAST_LIMIT = 3 						//* Max toasts quantity limit

//* ToolTip settings
	export const TOOLTIP_DELAY_TIME = 1300              //* Default toolTip delay time in milliseconds

//* LocalErrStorage settings
	export const RECENTLY_TIME = 20 					//* Time of error counting in seconds
	export const SAME_LOGS_QUANTITY = 7 				//* Limit of possible error quantity recently
	export const LOCAL_LOG_STORAGE_TIME = 24 			//* User error storage time in hours

//* Services settings
	export const CHECK_IP_AND_COUNTRY = false 			//* IP and Country checking before request on Api (ipapi.co, ip-api.com services)
	export const PERMITTED_COUNTRIES = ['BY', 'PL'] 	//* Permitted countries for working with app

export const WEATHER_UPDATE_TIME = 30       //* in minutes (default: 30)