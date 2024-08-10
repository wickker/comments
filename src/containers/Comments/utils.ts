import { Comment } from "@/types"

export const addNewReply = (
  comments: Comment[],
  commentId: number,
  newComment: Comment,
): Comment[] =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        replies: [...comment.replies, newComment],
      }
    }
    return {
      ...comment,
      replies: addNewReply(comment.replies, commentId, newComment),
    }
  })

export const editReply = (
  comments: Comment[],
  commentId: number,
  editedComment: string,
): Comment[] =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        comment: editedComment,
      }
    }
    return {
      ...comment,
      replies: editReply(comment.replies, commentId, editedComment),
    }
  })

export const deleteReply = (
  comments: Comment[],
  commentId: number,
): Comment[] => {
  const filtered = comments.filter((comment) => comment.id !== commentId)
  if (filtered.length < comments.length) {
    return filtered
  }
  return comments.map((comment) => ({
    ...comment,
    replies: deleteReply(comment.replies, commentId),
  }))
}
