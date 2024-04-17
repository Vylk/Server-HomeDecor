import dotenv from "dotenv"
dotenv.config({path: '../../.env'})

const dev = {
    app : {
        port : process.env.DEV_APP_PORT || 3001
    },
    db : {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: process.env.DEV_DB_PORT || 27017,
        name: process.env.DEV_DB_NAME || 'HomeDecor'
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID || "864100335320-l91bn1hm9c8qp3f38ugrc6bjqsg8b79j.apps.googleusercontent.com",
        client_secret: process.env.GOOGLE_CLIENT_SECRET || "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",
        redirect_url: process.env.GOOGLE_REDIRECT_URL|| "http://dev.klyvngo.pro/api/oauthgoole"
    }
}

const config = {dev}
export const env = config[process.env.NODE_ENV || `dev`]
