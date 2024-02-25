import AuthService from "../services/Auth.js"
import ErrorsUtils from "../utils/Errors.js"
import { COOKIE_SETTINGS } from "../constants.js"

class AuthController {
  static async signIn(req, res) {
    const { username, password } = req.body
    const { fingerprint } = req
    try {
      const { accessToken, refreshToken, accessTokenExpiration } = await AuthService.signIn({ username, password, fingerprint })

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({ accessToken, accessTokenExpiration })
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async checkUser(req, res) {
    const { username, password } = req.body

    try {
      const { userName, userPassword } = await AuthService.checkUser({ username, password })

      return res.status(200).json({ userName, userPassword })
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async signUp(req, res) {
    const { username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar } = req.body
    const { fingerprint } = req

    try {
      const { accessToken, refreshToken, accessTokenExpiration } = await AuthService.signUp({ username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar, fingerprint })

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({ accessToken, accessTokenExpiration })
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken
    const { fingerprint } = req
    try {
      await AuthService.logOut(refreshToken)

      res.clearCookie("refreshToken")

      return res.sendStatus(200)
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req
    const currentRefreshToken = req.cookies.refreshToken

    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.refresh({
          currentRefreshToken,
          fingerprint,
        })

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({ accessToken, accessTokenExpiration })
    } catch (err) {
      return ErrorsUtils.catchError(res, err)
    }
  }
}

export default AuthController