import { Application, Router } from "express"
import AuthController from "../controllers/Auth-controller"
import DeviceController from '../controllers/Device-controller'



const router = Router()

router.post("/sign-in", AuthController.signIn as Application)
router.post("/sign-up", AuthController.signUp as Application)
router.post("/logout", AuthController.logOut as Application)
router.post("/refresh", AuthController.refresh as Application)
router.post("/check-user", AuthController.checkUser as Application)
router.post("/block", DeviceController.blockDevice as Application)

export default router
