import { type Comment } from "@/types"
import { ChangeEvent, useState } from "react"
import { CommentInput } from "@/components"

type CommentProps = {
  addNewReply: (commentId: number, newComment: Comment) => void
} & Comment

export default function CommentTile({
  id,
  comment,
  replies,
  addNewReply,
}: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isInputVisible, setIsInputVisible] = useState(false)
  const [input, setInput] = useState("")

  const openInput = () => setIsInputVisible(true)

  const closeInput = () => setIsInputVisible(false)

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value)

  const validateInput = () => {
    if (!input.trim()) return false
    // TODO: Check for scripts / SQL injection
    return true
  }

  const handleReply = () => {
    openInput()
    setInput("")
  }

  const handleSubmitReply = () => {
    if (!validateInput()) return
    addNewReply(id, {
      id: Date.now(),
      comment: input,
      replies: [],
    })
    closeInput()
    setIsExpanded(true)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-md bg-[#E4E8EF] p-2">
        <p className="whitespace-pre-wrap">{comment}</p>

        <div className="mt-2 flex gap-x-4">
          <button className="text-blue-500 underline" onClick={handleReply}>
            Reply
          </button>
          <button className="text-blue-500 underline">Edit</button>
          <button className="text-blue-500 underline">Delete</button>
          {replies.length > 0 && (
            <button
              className="text-blue-500 underline"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Hide" : "Show"} replies
            </button>
          )}
        </div>
      </div>

      <div className="pl-8">
        {/* Add new reply */}
        <CommentInput
          input={input}
          isInputVisible={isInputVisible}
          onCancel={closeInput}
          onChange={handleInputChange}
          onSubmit={handleSubmitReply}
        />

        {isExpanded &&
          replies.map((reply) => <CommentTile {...reply} key={reply.id} addNewReply={addNewReply} />)}
      </div>
    </div>
  )
}
