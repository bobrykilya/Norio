import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ACCESS_TOKEN_EXPIRATION, COOKIE_SETTINGS } from "../../constants";
dotenv.config();
class TokenService {
    static async generateAccessToken(payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: String(ACCESS_TOKEN_EXPIRATION),
        });
    }
    static async generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: String(COOKIE_SETTINGS.REFRESH_TOKEN.maxAge),
        });
    }
    static async verifyAccessToken(accessToken) {
        return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    static async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
}
export default TokenService
