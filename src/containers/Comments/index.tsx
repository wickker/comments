import { useCallback, useEffect, useState } from "react"
import InfiniteScrollLoader from "./InfiniteScrollLoader"
import Loader from "./Loader"
import { addNewReply, deleteReply, editReply } from "./utils"
import { AddNewComment, CommentTile, SearchComments } from "@/components"
import useComment from "@/hooks/query/useComment"
import useElementVisible from "@/hooks/useElementVisible"
import { Comment } from "@/types"

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [offset, setOffset] = useState(0)
  const [isSearch, setIsSearch] = useState(false)

  const { useGetCommentsQuery } = useComment()
  const getComments = useGetCommentsQuery(offset)

  const hasOffset = offset > 0
  const hasComments = comments.length > 0

  const fetchMoreCommentsCallback = useCallback(() => {
    if (offset <= 30) {
      // hardcoded 30 for demo purposes
      setOffset((prev) => prev + 10)
      getComments.refetch()
    }
  }, [getComments, offset])

  const { observerRef } = useElementVisible(fetchMoreCommentsCallback)

  const handleAddNewReply = (commentId: number, newComment: Comment) =>
    setComments(addNewReply(comments, commentId, newComment))

  const handleEditReply = (commentId: number, editedComment: string) =>
    setComments(editReply(comments, commentId, editedComment))

  const handleDeleteReply = (commentId: number) =>
    setComments(deleteReply(comments, commentId))

  const handleAddNewComment = useCallback(
    (newComment: Comment) => setComments((prev) => [newComment, ...prev]),
    [],
  )

  useEffect(() => {
    if (!getComments.data) return
    if (offset === 0) {
      setComments(getComments.data)
      return
    }
    setComments((prev) => [...prev, ...getComments.data])
  }, [getComments.data, offset])

  return (
    <>
      <SearchComments setIsSearch={setIsSearch} comments={comments} isSearch={isSearch} />

      {!isSearch && (
        <>
          <AddNewComment addNewComment={handleAddNewComment} />

          {getComments.isLoading && !hasOffset && <Loader />}

          {hasComments && (
            <>
              {comments.map((c) => (
                <CommentTile
                  {...c}
                  key={c.id}
                  addNewReply={handleAddNewReply}
                  editReply={handleEditReply}
                  deleteReply={handleDeleteReply}
                  isSearchMode={isSearch}
                />
              ))}

              {/* TODO: Refactor this */}
              {getComments.isLoading && hasOffset ? (
                <InfiniteScrollLoader />
              ) : (
                <div ref={observerRef} />
              )}
            </>
          )}
        </>
      )}
    </>
  )
}

export default Comments
