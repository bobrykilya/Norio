import { Application, Router } from "express"
import UserController from "../controllers/User-controller.ts"



const ProtectedRouter = Router()

ProtectedRouter.post("/edit-user-info", UserController.editUserInfo as Application)

export default ProtectedRouter
