import dummyApi from "@/api/dummyApi"
import { useQuery } from "@tanstack/react-query"

const useComment = () => {
    const useGetCommentsQuery = () => {
        return useQuery({
            queryKey: ['comments'],
            queryFn: dummyApi.getComments
        })
    }

    return {
        useGetCommentsQuery
    }
}

export default useComment