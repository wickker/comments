import { memo } from "react"

type CommentTextProps = {
  comment: string
}

const CommentText = memo(({ comment }: CommentTextProps) => (
  <p className="whitespace-pre-wrap p-2">{comment}</p>
))

export default CommentText
