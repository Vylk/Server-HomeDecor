import { ErrorCreateProcess } from "../core/error.response.js"
import {ProcessModel} from "../models/process.model.js"

class ProcessService{
    static get = async (userid)=>{
        const process = await ProcessModel.findOne({userid: userid}).lean()

        if(process) return process
        const newProcess = await ProcessModel.create({
            userid: userid,
            data : {
                level: 0,
                score: 0
            }
        })
        if(newProcess) {
            return newProcess
        } else{
            throw new ErrorCreateProcess(
                `Can't create new Process of userId: ${userid}`,
                '/api/getprocess'
            )
        }
    }
    static update = async (userid, data)=>{
        const process = await ProcessModel.findOneAndUpdate({userid: userid}, {$set: {
            data: data
        }}, {new: true})
        if(process){
            return process
        }
        const newProcess = await ProcessModel.create({
            userid: userid,
            data : {
                level: 0,
                score: 0
            }
        })
        if (newProcess){
            return newProcess
        } else{
            throw new ErrorCreateProcess(
                `Can't create new Process of userId: ${userid}`,
                '/api/updateprocess'
            )
        }
    }
}
export default ProcessService