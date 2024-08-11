import dummyApi from "@/api/dummyApi"
import { useQuery } from "@tanstack/react-query"

const useComment = () => {
    const useGetCommentsQuery = (offset: number) => {
        return useQuery({
            queryKey: ['comments', offset],
            queryFn: () => dummyApi.getComments(offset)
        })
    }

    return {
        useGetCommentsQuery
    }
}

export default useComment