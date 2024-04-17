import { createLogger, transports, format } from "winston";
import 'winston-daily-rotate-file'
class Logger {
    constructor() {
        const formatPrint = format.printf(
            ({ level, message,context, timestamp, metadata }) => {
                return `${timestamp}::${level}::${context}::${message}::${JSON.stringify(metadata)}`
            })

        this.logger = createLogger({
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                formatPrint
            ),
            transports: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    filename: `server-${new Date().getDate()}.info.log`,
                    datePattern: 'YYYY-MM-DD-HH-mm',
                    zippedArchive: true,
                    maxSize: 5242880,
                    maxFiles: '10d',
                    format: format.combine(
                        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                        formatPrint
                    ),
                    level: 'info'
                }),
                new transports.DailyRotateFile({
                    dirname: 'src/logs',
                    filename: `server-${new Date().getTime()}.error.log`,
                    datePattern: 'YYYY-MM-DD-HH-mm',
                    zippedArchive: true,
                    maxSize: 5242880,
                    maxFiles: '10d',
                    format: format.combine(
                        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                        formatPrint
                    ),
                    level: 'error'
                })
            ]
        })
    }
    log(message, params){
        const logObject = Object.assign({
            message
        }, params)

        this.logger.info(logObject)
    }
    error(message, params){
        const logObject = Object.assign({
            message
        }, params)

        this.logger.error(logObject)
    }
}


export const logger = new Logger()