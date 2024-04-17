import { Router } from "express";
import { OK } from "../core/success.response.js";
import routerUser from "./user/index.user.js"
import routerProcess from "./process/index.process.js"

const router = Router()

router.get('/status', (req, res, next) => {
    new OK({
        message: "Server live",
        context: '/status',
        metadata : {}
    }).send(res)
})
router.use(routerUser)
router.use(routerProcess)

export default router
