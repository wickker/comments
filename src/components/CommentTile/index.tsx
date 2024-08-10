import { type Comment } from "@/types"
import { useState } from "react"
import { CommentInput } from "@/components"

type CommentProps = Comment

export default function CommentTile({ comment, replies }: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInputVisible, setIsInputVisible] = useState(false)

  const openInput = () => setIsInputVisible(true)

  const closeInput = () => setIsInputVisible(false)

  const handleReply = () => {
    openInput()
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-md bg-[#E4E8EF] p-2">
        <p className="whitespace-pre-wrap">{comment}</p>

        <div className="mt-2 flex gap-x-4">
          <button className="text-blue-700 underline" onClick={handleReply}>
            Reply
          </button>
          <button className="text-blue-700 underline">Edit</button>
          <button className="text-blue-700 underline">Delete</button>
          {replies.length > 0 && (
            <button
              className="text-blue-700 underline"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Hide" : "Show"} replies
            </button>
          )}
        </div>
      </div>

      <div className="pl-8">
        <CommentInput isInputVisible={isInputVisible} closeInput={closeInput} />

        {isExpanded &&
          replies.map((reply) => <CommentTile {...reply} key={reply.id} />)}
      </div>
    </div>
  )
}
