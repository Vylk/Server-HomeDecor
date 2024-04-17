import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import helmet from "helmet"
import compression from "compression"
import router from "./routers/index.router.js"


export const app = express()

//init middleware
app.use(bodyParser.json())
// app.use(morgan("dev"))
app.use(helmet())
app.use(compression())

//Init router
app.use("/", router)

//Handing error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        message: error.message || `Internal Server Error`
    })
})