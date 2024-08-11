import { AddNewComment, CommentTile } from "@/components"
import { Comment } from "@/types"
import { useState } from "react"
import { addNewReply, deleteReply, editReply } from "./utils"

const data: Comment[] = [
  {
    id: 1,
    comment:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
    replies: [
      {
        id: 2,
        comment:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        replies: [],
      },
      {
        id: 3,
        comment:
          "There are many variations of passages of Lorem Ipsum available",
        replies: [],
      },
      {
        id: 4,
        comment: "Lorem Ipsum is simply dummy text",
        replies: [],
      },
      {
        id: 8,
        comment: "Sed ut perspiciatis unde omnis iste natus",
        replies: [
          {
            id: 5,
            comment:
              "At vero eos et accusamus et iusto odio dignissimos\nAt vero eos et accusamus et iusto odio dignissimos\nAt vero eos et accusamus et iusto odio dignissimos\nAt vero eos et accusamus et iusto odio dignissimos\nAt vero eos et accusamus et iusto odio dignissimos",
            replies: [],
          },
          {
            id: 6,
            comment: "Duis aute irure dolor",
            replies: [],
          },
        ],
      },
    ],
  },
  { id: 7, comment: "Ut enim ad minima veniam", replies: [] },
]

const Comments = () => {
  const [comments, setComments] = useState(data)

  const handleAddNewReply = (commentId: number, newComment: Comment) =>
    setComments(addNewReply(comments, commentId, newComment))

  const handleEditReply = (commentId: number, editedComment: string) =>
    setComments(editReply(comments, commentId, editedComment))

  const handleDeleteReply = (commentId: number) =>
    setComments(deleteReply(comments, commentId))

  const handleAddNewComment = (newComment: Comment) => setComments([...comments, newComment])

  return (
    <>
    <AddNewComment addNewComment={handleAddNewComment} />
      {comments.map((c) => (
        <CommentTile
          {...c}
          key={c.id}
          addNewReply={handleAddNewReply}
          editReply={handleEditReply}
          deleteReply={handleDeleteReply}
        />
      ))}
    </>
  )
}

export default Comments
