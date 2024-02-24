import { Router } from "express"
import AuthController from "../controllers/Auth.js"
// import AuthValidator from "../validators/Auth.js"

const router = Router()

router.post("/sign-in", AuthController.signIn)
router.post("/sign-up", AuthController.signUp)
router.post("/logout", AuthController.logOut)
router.post("/refresh", AuthController.refresh)

export default router
