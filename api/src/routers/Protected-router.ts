import { Application, Router } from 'express'

import UserController from '@controllers/User-controller.ts'



const ProtectedRouter = Router()

ProtectedRouter.patch('/edit-user-info', UserController.editUserInfo as unknown as Application)
ProtectedRouter.patch('/edit-account-info', UserController.editAccountInfo as unknown as Application)

export default ProtectedRouter
