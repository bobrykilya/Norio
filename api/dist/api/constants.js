//* Auth settings
export const COOKIE_SETTINGS = {
    REFRESH_TOKEN: {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000, //* Refresh token maxAge (default: 3 * 24 * 60 * 60 * 1000 = 3 days)
        secure: true,
        strict: true,
        // sameSite: "strict",                 					//* /"lax"
    },
};
export const ACCESS_TOKEN_EXPIRATION = 60 * 60 * 1000 / 4; //* Access token maxAge (default: 60 * 60 * 1000 / 4 = 15 min)
export const FAST_SESSION_DURATION = 3 * 60 * 60; //* Fast session duration in seconds (default: 3 * 60 * 60 = 3 hours)
export const AUTO_LOGOUT_INTERVAL = 30 * 60; //* AutoLogout checking interval in seconds (default: 30 * 60 = 30 min)
export const DEFAULT_BLOCK_DURATION = 3; //* Block duration in minutes (default: 3 min)
export const MAX_SESSION_FOR_USER = 5; //* Maximum quantity of sessions for every user (default: 5)
//* HomePage settings
export const WEATHER_UPDATE_TIME_IN_MIN = 15; //* in minutes (default: 15 min)
