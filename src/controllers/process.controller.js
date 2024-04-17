import { ErrorVerifyAuth } from "../core/error.response.js";
import { GetProcess, UpdatedProcess } from "../core/success.response.js";
import AuthService from "../services/auth.service.js";
import ProcessService from "../services/process.service.js"

class ProcessController {
    getProcess = async (req, res, next) => {
        const { userid, auth_code } = req.body

        const isAuth = await AuthService.verify(userid, auth_code)
        if (isAuth) {
            const process = await ProcessService.get(userid)
            new GetProcess({
                message: "Get process done",
                context: "/api/getprocess",
                metadata: {
                    userid: process.userid,
                    data: process.data
                }
            }).send(res)
        } else {
            throw new ErrorVerifyAuth(
                `Userid or auth_code not correct`,
                '/api/getProcess'
            )
        }
    }

    updateProcess = async (req, res, next) => {
        const { userid, auth_code, data } = req.body
        const isAuth = await AuthService.verify(userid, auth_code)
        if (isAuth) {
            const process = await ProcessService.update(userid, data)
            new UpdatedProcess({
                message: `Update Process ${userid} done`,
                context: '/api/updateprocess',
                metadata: {
                    userid: process.userid,
                    data: process.data
                }
            }).send(res)
        } else {
            throw new ErrorVerifyAuth(
                `Userid or auth_code not correct`,
                '/api/getProcess'
            )
        }
    }
}

export default new ProcessController()