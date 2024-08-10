import { type Comment } from "@/types"
import { useState, ChangeEvent } from "react"
import { CommentInput, CommentText } from "@/components"

type CommentProps = {
  addNewReply: (commentId: number, newComment: Comment) => void
  editReply: (commentId: number, editedComment: string) => void
  deleteReply: (commentId: number) => void
} & Comment

const CommentTile = ({
  id,
  comment,
  replies,
  addNewReply,
  editReply,
  deleteReply,
}: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isReplyVisible, setIsReplyVisible] = useState(false)
  const [isEditVisible, setIsEditVisible] = useState(false)
  const [input, setInput] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value)

  const validateInput = () => {
    if (!input.trim()) return false
    // TODO: Check for scripts / SQL injection
    return true
  }

  const handleReply = () => {
    setIsEditVisible(false)
    setIsReplyVisible(true)
    setInput("")
  }

  const closeReply = () => setIsReplyVisible(false)

  const submitReply = () => {
    if (!validateInput()) return
    addNewReply(id, {
      id: Date.now(),
      comment: input,
      replies: [],
    })
    closeReply()
    setIsExpanded(true)
  }

  const handleEdit = () => {
    setIsReplyVisible(false)
    setIsEditVisible(true)
    setInput(comment)
  }

  const closeEdit = () => setIsEditVisible(false)

  const submitEdit = () => {
    if (!validateInput()) return
    editReply(id, input)
    closeEdit()
  }
  
  return (
    <div className="flex flex-col gap-y-4">
      {isEditVisible ? (
        // Edit reply
        <CommentInput
          input={input}
          isInputVisible={isEditVisible}
          onCancel={closeEdit}
          onSubmit={submitEdit}
          onChange={handleInputChange}
        />
      ) : (
        <div className="rounded-md bg-[#E4E8EF] p-2">
          <CommentText comment={comment} />

          <div className="ml-2 mt-2 flex gap-x-4">
            <button className="text-blue-500 underline" onClick={handleReply}>
              Reply
            </button>
            <button className="text-blue-500 underline" onClick={handleEdit}>
              Edit
            </button>
            <button className="text-blue-500 underline" onClick={() => deleteReply(id)}>Delete</button>
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
      )}

      <div className="pl-8">
        {/* Add new reply */}
        <CommentInput
          input={input}
          isInputVisible={isReplyVisible}
          onCancel={closeReply}
          onSubmit={submitReply}
          onChange={handleInputChange}
          className="mb-4"
        />

        {isExpanded &&
          replies.map((reply) => (
            <CommentTile
              {...reply}
              key={reply.id}
              addNewReply={addNewReply}
              editReply={editReply}
              deleteReply={deleteReply}
            />
          ))}
      </div>
    </div>
  )
}

export default CommentTile
