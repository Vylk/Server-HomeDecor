import { decode } from "jsonwebtoken";
export async function infoDecode(id_token) {
    const dataDecode = decode(id_token)
    return dataDecode
}