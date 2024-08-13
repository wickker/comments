import { memo } from "react"

type CommentTileActionsProps = {
  id: number
  handleReply: () => void
  handleEdit: () => void
  deleteReply: (commentId: number) => void
  hasReplies: boolean
  isExpanded: boolean
  isSearchMode: boolean
  toggleIsExpanded: () => void
}

const CommentTileActions = memo(
  ({
    id,
    handleReply,
    handleEdit,
    deleteReply,
    hasReplies,
    isExpanded,
    toggleIsExpanded,
    isSearchMode,
  }: CommentTileActionsProps) => (
    <div className="ml-2 mt-2 flex gap-x-4">
      {!isSearchMode && (
        <>
          <button className="text-blue-500 underline" onClick={handleReply}>
            Reply
          </button>

          <button className="text-blue-500 underline" onClick={handleEdit}>
            Edit
          </button>

          <button
            className="text-blue-500 underline"
            onClick={() => deleteReply(id)}
          >
            Delete
          </button>
        </>
      )}

      {hasReplies && (
        <button className="text-blue-500 underline" onClick={toggleIsExpanded}>
          {isExpanded ? "Hide" : "Show"} replies
        </button>
      )}
    </div>
  ),
)

export default CommentTileActions
