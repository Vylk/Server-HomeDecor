import { logger } from "../logger/winston.log.js"
const statusCode = {
    ERRORLOGINUSER: 521,
    ERRORCREATEAUTH: 522,
    ERRORVERIFYAUTH: 523,
    ERRORCREATEPROCESS: 524
}

const ReasonStautsCode = {
    ERRORLOGINUSER: "Can't login",
    ERRORCREATEAUTH: "Can't create auth_code",
    ERRORVERIFYAUTH: "Can't verify auth_code",
    ERRORCREATEPROCESS: "Can't create process"
}

class ErrorResponse extends Error{
    constructor(message, context = '/', status){
        super(message)
        this.status = status
        this.context = context

        logger.error(this.message, {
            context:this.context,
            message: this.message,
            metadata: {}
        })
    }
}

class ErrorLoginUser extends ErrorResponse{
    constructor(message=ReasonStautsCode.ERRORLOGINUSER,context, status=statusCode.ERRORLOGINUSER){
        super(message, status)
    }
}

class ErrorCreateAuth extends ErrorResponse{
    constructor(message=ReasonStautsCode.ERRORCREATEAUTH,context, status=statusCode.ERRORCREATEAUTH){
        super(message, status)
    }
}

class ErrorVerifyAuth extends ErrorResponse{
    constructor(message=ReasonStautsCode.ERRORVERIFYAUTH,context, status=statusCode.ERRORVERIFYAUTH){
        super(message, status)
    }
}

class ErrorCreateProcess extends ErrorResponse{
    constructor(message=ReasonStautsCode.ERRORCREATEPROCESS,context, status=statusCode.ERRORCREATEPROCESS){
        super(message, status)
    }
}

export {ErrorLoginUser, ErrorCreateAuth, ErrorVerifyAuth,ErrorCreateProcess}