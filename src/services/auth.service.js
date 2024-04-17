import { ErrorCreateAuth } from "../core/error.response.js"
import { AuthModel } from "../models/auth.model.js"

class AuthService {
    static create = async (userid, auth_code) => {

        const auth = await AuthModel.findOneAndUpdate({ userid: userid }, { $set: { auth_code: auth_code } },{new: true}).lean()
        if (auth) return auth

        const newAuth = await AuthModel.create({ userid: userid, auth_code: auth_code })
        if (newAuth) {
            return newAuth
        } else {
            throw new ErrorCreateAuth
        }
    }
    static verify = async (userid, auth_code) => {
        const auth = await AuthModel.findOne({ userid: userid, auth_code: auth_code }).lean()
        if (auth) return true
        return false
    }
}
export default AuthService