import { app } from "./src/app.js";
import { env } from "./src/configs/configs.js";
import Database from "./src/db/init.mongodb.js";

const PORT = env.app.port || 3001
const server = app.listen(PORT, ()=>{
    console.log(`Server start with port : ${PORT}`)
})
process.on("SIGINT", ()=>{
    server.close(()=>{
        Database.disconnect()
        console.log(`Server close`)
    })
})