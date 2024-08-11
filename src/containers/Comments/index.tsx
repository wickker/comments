import { AddNewComment, CommentTile } from "@/components"
import { Comment } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { addNewReply, deleteReply, editReply } from "./utils"
import useComment from "@/hooks/query/useComment"
import { FiLoader } from "react-icons/fi"
import useElementVisible from "@/hooks/useElementVisible"

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([])
  const [offset, setOffset] = useState(0)
  const { useGetCommentsQuery } = useComment()
  const getComments = useGetCommentsQuery(offset)

  const isVisibleCallback = useCallback(() => {
    if (offset <= 30) { // hardcoded for demo purposes
      setOffset((prev) => prev + 10)
      getComments.refetch()
    }
  }, [getComments, offset])

  const { observerRef } = useElementVisible(isVisibleCallback)

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
      <AddNewComment addNewComment={handleAddNewComment} />

      {getComments.isLoading && offset === 0 && (
        <div className="my-auto grid place-items-center">
          <FiLoader className="animate-spin text-4xl text-neutral-400" />
        </div>
      )}

      {comments.length > 0 && (
        <>
          {comments.map((c) => (
            <CommentTile
              {...c}
              key={c.id}
              addNewReply={handleAddNewReply}
              editReply={handleEditReply}
              deleteReply={handleDeleteReply}
            />
          ))}
          {getComments.isLoading && offset > 0 ? (
            <div className="grid place-items-center">
              <FiLoader className="animate-spin text-2xl text-neutral-400" />
            </div>
          ) : (
            <div ref={observerRef} />
          )}
        </>
      )}
    </>
  )
}

export default Comments
