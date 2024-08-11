import { Comment } from "@/types"

const baseUrl = "http://localhost:3000"

const getComments = async (offset: number): Promise<Comment[]> => {
    const res = await fetch(`${baseUrl}/comments?_start=${offset}&_limit=10`)
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    return await res.json()
}

export default {
    getComments
}
