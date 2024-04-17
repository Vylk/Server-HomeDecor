import { model, Schema } from "mongoose"
const DOCUMENT_NAME = `User`
const userSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        enum: [`active`, `deleted`], // Apple yêu cầu chức năng xoá tài khoản trên ứng dụng
        default: 'active'
    }
}, {
    timestamps: true
})

const UserModel = model(DOCUMENT_NAME, userSchema)
export { UserModel }

