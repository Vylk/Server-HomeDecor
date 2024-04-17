import { logger } from "../logger/winston.log.js"

const StatusCode = {
    OK: 200,
    CREATED: 201,
    LOGINSUCCESS: 220,
    UPDATEDPROCESS: 221,
    GETPROCESS: 222
}

const ReasonStatusCode = {
    OK: "Success",
    CREATED: "Created",
    UPDATEDPROCESS: "Process updated",
    GETPROCESS: "Get Process done"
}

class SuccessResponse {
    constructor({ message, context ,statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message
        this.context = context
        this.status = statusCode
        this.metadata = metadata
    }
    send(res, header = {}) {
        logger.log(this.message, {
            context: this.context,
            message : this.message,
            metadata : this.metadata
        })
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor(message, context, metadata) {
        super(message, context, metadata)
    }
}
class LoginSuccess extends SuccessResponse {
    constructor(message,context, statusCode = StatusCode.LOGINSUCCESS, reasonStatusCode = ReasonStatusCode.LOGINSUCCESS, metadata) {
        super(message,context, statusCode, reasonStatusCode, metadata)
    }
}
class UpdatedProcess extends SuccessResponse {
    constructor(message,context, statusCode = StatusCode.UPDATEDPROCESS, reasonStatusCode = ReasonStatusCode.UPDATEDPROCESS, metadata) {
        super(message,context, statusCode, reasonStatusCode, metadata)
    }
}

class GetProcess extends SuccessResponse {
    constructor(message,context, statusCode = StatusCode.GETPROCESS, reasonStatusCode = ReasonStatusCode.GETPROCESS, metadata) {
        super(message,context, statusCode, reasonStatusCode, metadata)
    }
}


export { OK, LoginSuccess, UpdatedProcess, GetProcess }