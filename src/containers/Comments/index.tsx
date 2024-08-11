import { AddNewComment, CommentTile } from "@/components"
import { Comment } from "@/types"
import { useEffect, useState } from "react"
import { addNewReply, deleteReply, editReply } from "./utils"
import useComment from "@/hooks/query/useComment"
import { FiLoader } from "react-icons/fi"

const Comments = () => {
  const { useGetCommentsQuery } = useComment()
  const getComments = useGetCommentsQuery()
  const [comments, setComments] = useState<Comment[]>([])

  const handleAddNewReply = (commentId: number, newComment: Comment) =>
    setComments(addNewReply(comments, commentId, newComment))

  const handleEditReply = (commentId: number, editedComment: string) =>
    setComments(editReply(comments, commentId, editedComment))

  const handleDeleteReply = (commentId: number) =>
    setComments(deleteReply(comments, commentId))

  const handleAddNewComment = (newComment: Comment) =>
    setComments([newComment, ...comments])

  const generateCommentTiles = () =>
    comments.map((c) => (
      <CommentTile
        {...c}
        key={c.id}
        addNewReply={handleAddNewReply}
        editReply={handleEditReply}
        deleteReply={handleDeleteReply}
      />
    ))

  useEffect(() => {
    if (getComments.data) {
      setComments(getComments.data)
    }
  }, [getComments.data])

  return (
    <>
      <AddNewComment addNewComment={handleAddNewComment} />

      {getComments.isLoading && (
        <div className="grid h-full place-items-center">
          <FiLoader className="animate-spin text-4xl text-neutral-400" />
        </div>
      )}

      {getComments.isFetched && generateCommentTiles()}
    </>
  )
}

export default Comments
