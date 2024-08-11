import { Comment } from "@/types"

const baseUrl = "http://localhost:3000"

const getComments = async (): Promise<Comment[]> => {
    const res = await fetch(`${baseUrl}/comments`)
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return await res.json()
}

export default {
    getComments
}
