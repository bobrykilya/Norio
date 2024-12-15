//* Auth settings
    export const COOKIE_SETTINGS = {
        REFRESH_TOKEN: {
            httpOnly: true,
            maxAge: 1296e6,                     //* Refresh token maxAge: 15 * 24 * 3600 * 1000 (15 дней)
            secure: true,
            strict: true,
            // sameSite: "strict",                 //* /"lax"
        },
    }
    export const ACCESS_TOKEN_EXPIRATION = 18e5 //* Access token maxAge: 1800 * 1000 (30 минут)

    export const FAST_SESSION_DURATION = 10     //* Fast session duration in seconds (default: 600)
    export const AUTO_LOGOUT_INTERVAL = 60      //* AutoLogout checking interval in seconds (default: 60)
    export const DEFAULT_BLOCK_DURATION = 3     //* Block duration in minutes

	export const WEATHER_UPDATE_TIME = 30       //* in minutes
