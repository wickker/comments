const baseUrl = "https://dummyjson.com"

export const getComments = async () => {
    const res = await fetch(`${baseUrl}/comments?limit=20&skip=0`)
    return await res.json()
}

