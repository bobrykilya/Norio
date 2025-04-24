export const LOGOUT_LS = 'lastLogout'
export const FAST_LS = 'fastSession'
export const BLOCK_DEVICE = 'blockDevice'
export const DEVICE_LS = 'deviceInfo'
export const LOG_LIST_LS = 'localLogList'
export const CURRENT_USER_LS = 'currentUser'
export const SWITCH_USERS_ID_LS = 'switchUsersId'


export const APP_TITLE = 'NORIO'
export const MY_LOC = 'myLocation'

//* Snack (err, warning, success) settings
	export const TOAST_LIMIT = 3 						//* Max toasts quantity limit

//* ToolTip settings
	export const TOOLTIP_DELAY_TIME = 1300              //* Default toolTip delay time in milliseconds

//* LocalErrStorage settings
	export const RECENTLY_TIME = 20 					//* Time of error counting in seconds
	export const SAME_LOGS_QUANTITY = 7 				//* Limit of possible error quantity recently
	export const LOCAL_LOG_STORAGE_TIME = 24 			//* User error storage time in hours

//* Auth settings
	export const CHECK_IP_AND_COUNTRY = false 			//* IP and Country checking before request on Api (ipapi.co, ip-api.com services)
	export const PERMITTED_COUNTRIES = ['BY', 'PL'] 	//* Permitted countries for working with app

//* Weather settings
	export const WEATHER_ACCURACY = 3 					//* Number of decimal places for weather-service's coords (default: 3)

//* Users settings
	export const MAX_SWITCH_USERS = 3					//* Max quantity of authorized users on client