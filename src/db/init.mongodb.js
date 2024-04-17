import mongoose from "mongoose";
import { env } from "../configs/configs.js";

const connectString = `mongodb://${env.db.host}:${env.db.port}/${env.db.name}`
class Database {
    constructor(){
        return this.connect()
    }
    connect (type = `mongodb`) {
        if (true){
            mongoose.set('debug',true)
            mongoose.set('debug', {color : true})
        }
        mongoose.connect(connectString).then(_ =>{
            console.log(`Connected MongoDB`)
        }).catch(err =>{
            console.log("Error connect MongoDB")
        })
    }
    static getIntance(){
        if(!Database.intance){
            Database.intance = new Database()
        }
        
        return Database.intance
    }
    static disconnect(){
        mongoose.disconnect()
    }
}

export const intanceMongoDB = Database.getIntance()
export default Database