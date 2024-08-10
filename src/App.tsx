import { useState } from "react"
import { CommentTile } from "./components"
import { Comment as CommentType } from "./types"

const data: CommentType[] = [
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

export default function App() {
  const [comments, setComments] = useState(data)

  const addNewReply = (
    comments: CommentType[],
    commentId: number,
    newComment: CommentType,
  ): CommentType[] =>
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

  const handleAddNewReply = (commentId: number, newComment: CommentType) => setComments(addNewReply(comments, commentId, newComment))
  

  return (
    <div className="mx-auto flex max-w-xl flex-col bg-[#F3F5F8] px-4 pt-4">
      {comments.map((c) => (
        <CommentTile {...c} key={c.id} />
      ))}
    </div>
  )
}
