import { Application, Router } from "express"
import UserController from "../controllers/User-controller.ts"



const ProtectedRouter = Router()

ProtectedRouter.post("/edit-user-info", UserController.editUserInfo as unknown as Application)
ProtectedRouter.post("/edit-account-info", UserController.editAccountInfo as unknown as Application)
ProtectedRouter.post("/protected-check-user", UserController.protectedCheckUser as unknown as Application)

export default ProtectedRouter
