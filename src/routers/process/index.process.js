import { Router } from "express";
import processController from "../../controllers/process.controller.js"
const routerProcess = Router()

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

routerProcess.post('/api/getprocess', asyncHandler(processController.getProcess))
routerProcess.post('/api/updateprocess', asyncHandler(processController.updateProcess))


export default routerProcess
