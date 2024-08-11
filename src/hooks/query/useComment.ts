import { useQuery } from "@tanstack/react-query"
import dummyApi from "@/api/dummyApi"

const useComment = () => {
  const useGetCommentsQuery = (offset: number) => {
    return useQuery({
      queryKey: ["comments", offset],
      queryFn: () => dummyApi.getComments(offset),
    })
  }

  return {
    useGetCommentsQuery,
  }
}

export default useComment
