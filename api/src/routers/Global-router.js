import { Router } from "express"
import AuthController from "../controllers/Auth-controller.js"
import DeviceController from './../controllers/Device-controller.js'



const router = Router()

router.post("/sign-in", AuthController.signIn)
router.post("/sign-up", AuthController.signUp)
router.post("/logout", AuthController.logOut)
router.post("/refresh", AuthController.refresh)
router.post("/check-user", AuthController.checkUser)
router.post("/block", DeviceController.blockDevice)

export default router