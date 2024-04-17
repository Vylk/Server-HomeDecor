import { model, Schema } from "mongoose"
const DOCUMENT_NAME = `Process`
const processSchema = new Schema({
    userid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    data: {
        level: {
            type: Number,
            require: true,
            default: 0
        },
        score: {
            type: Number,
            require: true,
            default: 0
        }
    }
}, {
    timestamps: true
})

const ProcessModel = model(DOCUMENT_NAME, processSchema)
export { ProcessModel }

