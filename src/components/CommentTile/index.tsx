import { type Comment } from "@/types"
import { useState, ChangeEvent, useCallback, useMemo } from "react"
import { CommentInput, CommentText, CommentTileActions } from "@/components"
import { validateInput } from "./utils"

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

  const toggleIsExpanded = useCallback(() => setIsExpanded((prev) => !prev), [])

  const replyTiles = useMemo(
    () =>
      replies.map((reply) => (
        <CommentTile
          {...reply}
          key={reply.id}
          addNewReply={addNewReply}
          editReply={editReply}
          deleteReply={deleteReply}
        />
      )),
    [replies, addNewReply, editReply, deleteReply],
  )

  // Replies
  const handleReply = useCallback(() => {
    setIsEditVisible(false)
    setIsReplyVisible(true)
    setInput("")
  }, [])

  const closeReply = () => setIsReplyVisible(false)

  const submitReply = () => {
    if (!validateInput(input)) return
    addNewReply(id, {
      id: Date.now(),
      comment: input,
      replies: [],
    })
    closeReply()
    setIsExpanded(true)
  }

  // Edits
  const handleEdit = useCallback(() => {
    setIsReplyVisible(false)
    setIsEditVisible(true)
    setInput(comment)
  }, [comment])

  const closeEdit = () => setIsEditVisible(false)

  const submitEdit = () => {
    if (!validateInput(input)) return
    editReply(id, input)
    closeEdit()
  }

  return (
    <div className="flex flex-col gap-y-4">
      {!isEditVisible && (
        <div className="rounded-md bg-[#E4E8EF] p-2">
          <CommentText comment={comment} />
          <CommentTileActions
            id={id}
            handleReply={handleReply}
            handleEdit={handleEdit}
            deleteReply={deleteReply}
            hasReplies={replies.length > 0}
            isExpanded={isExpanded}
            toggleIsExpanded={toggleIsExpanded}
          />
        </div>
      )}

      {/* Edit reply */}
      <CommentInput
        input={input}
        isInputVisible={isEditVisible}
        onCancel={closeEdit}
        onSubmit={submitEdit}
        onChange={handleInputChange}
      />

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

        {isExpanded && replyTiles}
      </div>
    </div>
  )
}

export default CommentTile
