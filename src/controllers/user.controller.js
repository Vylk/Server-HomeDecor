
import UserService from "../services/user.service.js"
import AuthService from "../services/auth.service.js"
import { getTokenJwt, url } from "../utils/getUrlRedirect.js"
import { infoDecode } from "../utils/jwtUserInfo.js"
import { LoginSuccess } from "../core/success.response.js"
class UserController{
    login = async (req,res,next) =>{
        return res.redirect(url)
    }
    oauth = async (req, res, next) =>{
        // token.tokens = {access_token, id_token,expiry_date }
        const token = await getTokenJwt(req.query.code)
        
        // info = {iss, email, email_verified, name, picture}
        const info = await infoDecode(token.tokens.id_token)
        // user = {userid, name, email}
        const user = await UserService.loginUser(info.email, info.name)

        // auth = {userid, auth_code}
        const auth = await AuthService.create(user.userid, token.tokens.access_token)
        new LoginSuccess({
            message: "Login With Google Success",
            context: '/api/oauthgoole',
            metadata: {
                userid: user.userid,
                name: user.name,
                email: user.email,
                auth_code: auth.auth_code
            }
        }).send(res)
    }
}

export default new UserController()