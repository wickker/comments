import { useState, ChangeEvent, useCallback, useMemo } from "react"
import CommentInput from './CommentInput'
import CommentInputActions from "./CommentInputActions"
import CommentText from "./CommentText"
import CommentTileActions from "./CommentTileActions"
import { validateInput } from "./utils"
import { type Comment } from "@/types"

type CommentProps = {
  addNewReply?: (commentId: number, newComment: Comment) => void
  editReply?: (commentId: number, editedComment: string) => void
  deleteReply?: (commentId: number) => void
  isSearchMode: boolean
} & Comment

const CommentTile = ({
  id,
  comment,
  replies,
  isSearchMode,
  addNewReply = () => {},
  editReply = () => {},
  deleteReply = () => {},
}: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(true)
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
          isSearchMode={isSearchMode}
        />
      )),
    [replies, addNewReply, editReply, deleteReply, isSearchMode],
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
    <div className="flex min-w-[600px] flex-col gap-y-4">
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
            isSearchMode={isSearchMode}
          />
        </div>
      )}

      {/* Edit reply */}
      {isEditVisible && (
        <CommentInput input={input} onChange={handleInputChange}>
          <CommentInputActions onCancel={closeEdit} onSubmit={submitEdit} />
        </CommentInput>
      )}

      <div className="pl-8">
        {/* Add new reply */}
        {isReplyVisible && (
          <CommentInput
            input={input}
            onChange={handleInputChange}
            className="mb-4"
          >
            <CommentInputActions onCancel={closeReply} onSubmit={submitReply} />
          </CommentInput>
        )}

        {isExpanded && replyTiles}
      </div>
    </div>
  )
}

export default CommentTile
