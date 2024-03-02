import bcrypt from "bcryptjs"
import os from "os"
import TokenService from "./Token.js"
import { NotFound, Forbidden, Conflict, Unauthorized } from "../utils/Errors.js"
import RefreshSessionsRepository from "../repositories/RefreshSession.js"
import UserRepository from "../repositories/User.js"
import UserInfoRepository from '../repositories/UserInfo.js'
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js"
import LoginDeviceRepository from '../repositories/LoginDevice.js'


const getAllIPv4Addresses = () => {
  const networks = os.networkInterfaces()
  const allAddresses = []
  for (const network of Object.keys(networks)) {
    for (const net of networks[network]) {
      if (net.family === 'IPv4' && !net.internal) {
        // allAddresses.push({network, address: net.address})
        allAddresses.push(net.address)
      }
    }
  }
  return JSON.stringify(allAddresses)
}

class AuthService {

  static async signIn({ username, password, fingerprint }) {
    const userData = await UserRepository.getUserData(username)

    const localIp = getAllIPv4Addresses()
    let deviceId = await LoginDeviceRepository.getDeviceId(fingerprint.hash, localIp)
    
    if (deviceId) {
      const isSessionDouble = await RefreshSessionsRepository.isRefreshSessionDouble(deviceId)
      if (isSessionDouble) {
        throw new Conflict("На устройстве уже выполнен вход. Обновите страницу")
      }
    }

    if (!userData) {
      throw new NotFound("Пользователь не найден")
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password)
    if (!isPasswordValid) {
      throw new Unauthorized("Неверный логин или пароль")
    }
    

    //* Control of max sessions for every user
    const sessionsQuantity = await RefreshSessionsRepository.getRefreshSessionsQuantity(userData.id)
    if (sessionsQuantity >= 7) {
      const oldestSessionId = await RefreshSessionsRepository.getOldestRefreshSessions(userData.id)
      await RefreshSessionsRepository.deleteRefreshSessionById(oldestSessionId)
    }
    
    if (!deviceId) {
      deviceId = await LoginDeviceRepository.createDevice(fingerprint, localIp)
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
      deviceId,
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
    //! Change
    const access_lvl = 1
    let id
    const localIp = getAllIPv4Addresses()
    let deviceId = await LoginDeviceRepository.getDeviceId(fingerprint.hash, localIp)

    if (deviceId) {
      const isSessionDouble = await RefreshSessionsRepository.isRefreshSessionDouble(deviceId)
      if (isSessionDouble) {
        throw new Conflict("На устройстве уже выполнен вход. Обновите страницу")
      }
    }

    try {
      id  = await UserRepository.createUser({ 
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
    } catch (error) {
      // console.log(error)
      throw new Forbidden(error.detail)
    }

    if (!deviceId) {
      deviceId = await LoginDeviceRepository.createDevice(fingerprint, localIp)
    }

    const payload = { id, username, access_lvl }

    const accessToken = await TokenService.generateAccessToken(payload)
    const refreshToken = await TokenService.generateRefreshToken(payload)

    await RefreshSessionsRepository.createRefreshSession({
      id,
      refreshToken,
      deviceId,
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

    const deviceId = await LoginDeviceRepository.getDeviceId(fingerprint.hash, getAllIPv4Addresses())
    if (refreshSession.device_id !== deviceId) {
      console.log("Попытка несанкционированного обновления токенов!")
      throw new Forbidden("Попытка несанкционированного обновления токенов!")
    }

    await RefreshSessionsRepository.deleteRefreshSession(currentRefreshToken)

    let payload
    try {
      payload = await TokenService.verifyRefreshToken(currentRefreshToken)
    } catch (error) {
      throw new Forbidden(error.detail)
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
      deviceId,
    })

    return { 
      accessToken, 
      refreshToken, 
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION, 
    }
  }
}

export default AuthService
