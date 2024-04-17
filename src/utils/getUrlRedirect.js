import { google } from "googleapis";
import { env } from "../configs/configs.js"

const oauthClient = new google.auth.OAuth2(
    env.google.client_id,
    env.google.client_secret,
    env.google.redirect_url,
)

const scope = [
    'https://www.googleapis.com/auth/userinfo.email',
    'profile'
]
export const url = oauthClient.generateAuthUrl({
    access_type: 'offline',
    scope: scope
})

export async function getTokenJwt(code) {
    return oauthClient.getToken(code)
}