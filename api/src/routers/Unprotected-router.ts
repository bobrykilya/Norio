import { Application, Router } from "express"
import DeviceController from '../controllers/Device-controller'
import UserController from "../controllers/User-controller.ts"



const UnprotectedRouter = Router()

UnprotectedRouter.post("/weather", DeviceController.getWeather as Application)
UnprotectedRouter.post("/horoscope", UserController.getHoroscope as Application)

export default UnprotectedRouter
