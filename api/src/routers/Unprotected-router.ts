import { Application, Router } from "express"
import DeviceController from '../controllers/Device-controller'



const UnprotectedRouter = Router()

UnprotectedRouter.post("/weather", DeviceController.getWeather as Application)

export { UnprotectedRouter }
