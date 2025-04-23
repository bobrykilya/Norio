import { Application, Router } from "express"
import DeviceController from '../controllers/Device-controller'
import UserController from "../controllers/User-controller.ts"



const UnprotectedRouter = Router()

UnprotectedRouter.get("/weather", DeviceController.getWeather as Application)
UnprotectedRouter.get("/horoscope", UserController.getHoroscope as unknown as Application)

export default UnprotectedRouter
