import { model, Schema } from "mongoose"
const DOCUMENT_NAME = `Auth`
const authSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    auth_code: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const AuthModel = model(DOCUMENT_NAME, authSchema)
export { AuthModel }

