import { Router } from "express";
import userController from "../../controllers/user.controller.js";
const routerUser = Router()

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

routerUser.get('/api/login', userController.login)
routerUser.get('/api/oauthgoole', asyncHandler(userController.oauth))

export default routerUser
