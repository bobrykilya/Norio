import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import TokenService from "./Token.js"
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js"
import RefreshSessionsRepository from "../repositories/RefreshSession.js"
import UserRepository from "../repositories/User.js"
import UserInfoRepository from '../repositories/UserInfo.js'
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js"

class AuthService {
  static async signIn({ username, password, fingerprint }) {
    const userData = await UserRepository.getUserData(username)

    if (!userData) {
      throw new NotFound("Пользователь не найден")
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password)

    if (!isPasswordValid) {
      throw new Unauthorized("Неверный логин или пароль")
    }
    
    const isSessionDouble = await RefreshSessionsRepository.isRefreshSessionDouble(fingerprint.hash)
    if (isSessionDouble) {
      // location.reload(true)
      throw new Conflict("На устройстве уже выполнен вход. Обновите страницу")
    }
    // console.log(isSessionDouble)

    const sessionsQuantity = await RefreshSessionsRepository.getRefreshSessionsQuantity(userData.id)

    if (sessionsQuantity >= 5) {
      const oldestSessionId = await RefreshSessionsRepository.getOldestRefreshSessions(userData.id)
      // console.log(oldestSessionId)
      await RefreshSessionsRepository.deleteRefreshSessionById(oldestSessionId)
    }

    const payload = { 
      id: userData.id,
      access_lvl: userData.access_lvl,
      username,
    }

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionsRepository.createRefreshSession({
      id: userData.id, 
      refreshToken,
      fingerprint,
    })

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    }
  }

  static async checkUser({ username, password }) {
    const userData = await UserRepository.getUserData(username)
    if (userData) {
      throw new Conflict("Пользователь с таким логином уже существует")
    }

    const hashedPassword = bcrypt.hashSync(password, 8)
    const avatarsList = await UserInfoRepository.getUsedAvatarsList()

    return { 
      userName: username, 
      userPassword: hashedPassword,
      avatarsList,
    }
  }

  static async signUp({ username, hashedPassword, phone, store, job, last_name, first_name, middle_name, avatar, fingerprint }) {
    // const userData = await UserRepository.getUserData(username)
    // if (userData) {
    //   throw new Conflict("Пользователь с таким именем уже существует")
    // }

    // const hashedPassword = bcrypt.hashSync(password, 8)

    //! Change
    const access_lvl = 1
    
    const { id } = await UserRepository.createUser({ 
      username,
      hashedPassword,
      access_lvl,
    })

    await UserInfoRepository.createUserInfo({ 
      user_id: id,
      phone, 
      store, 
      job, 
      last_name, 
      first_name, 
      middle_name, 
      avatar,
    })

    const payload = { id, username, access_lvl }

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    })

    return { 
      accessToken, 
      refreshToken, 
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION, 
    }
  }

  static async logOut(refreshToken) {
    await RefreshSessionsRepository.deleteRefreshSession(refreshToken)
  }

  static async refresh({ fingerprint, currentRefreshToken }) {
    if  (!currentRefreshToken) {
      throw new Unauthorized()
    }

    const refreshSession = await RefreshSessionsRepository.getRefreshSession(currentRefreshToken)

    if (!refreshSession) {
      throw new Unauthorized()
    }

    if (refreshSession.finger_print !== fingerprint.hash) {
      console.log("Попытка несанкционированного обновления токенов!")
      throw new Forbidden("Попытка несанкционированного обновления токенов!")
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken)

    let payload
    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken)
    } catch (error) {
      throw new Forbidden(error)
    }

    const { 
      id,
      access_lvl, 
      name: username, 
    } = await UserRepository.getUserData(payload.username)

    const actualPayload = { id, username, access_lvl }

    const accessToken = await TokenService.generateAccessToken(actualPayload)
    const refreshToken = await TokenService.generateRefreshToken(actualPayload)

    await RefreshSessionsRepository.createRefreshSession({
      id, 
      refreshToken,
      fingerprint,
    })

    return { 
      accessToken, 
      refreshToken, 
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION, 
    }
  }
}

export default AuthService
