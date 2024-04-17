import { UserModel } from "../models/user.model.js"
import crypto from "crypto"
import { ErrorLoginUser } from "../core/error.response.js"

const createId = () => {
    return crypto.randomBytes(10).toString('hex')
}

class UserService {
    static loginUser = async (email, name) => {
        // default return Mongoose Document Class, lean() help return Object JS
        const userData = await UserModel.findOne({ email }).lean()
        if (userData) {
            return userData
        }

        const createUser = await UserModel.create({
            userid: createId(),
            name: name,
            email: email
        })
        if (createUser) {
            return createUser
        } else {
            throw new ErrorLoginUser(
                `Can't Login`,
                '/api/oauthgoogle'
            )
        }
    }
}
export default UserService