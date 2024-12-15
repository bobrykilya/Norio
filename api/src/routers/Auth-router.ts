import { Application, Router } from "express"
import AuthController from "../controllers/Auth-controller"
import DeviceController from '../controllers/Device-controller'



const AuthRouter = Router()

AuthRouter.post("/sign-in", AuthController.signIn as Application)
AuthRouter.post("/sign-up", AuthController.signUp as Application)
AuthRouter.post("/logout", AuthController.logOut as Application)
AuthRouter.post("/refresh", AuthController.refresh as Application)
AuthRouter.post("/check-user", AuthController.checkUser as Application)
AuthRouter.post("/block", DeviceController.blockDevice as Application)

export { AuthRouter }
