import { memo } from "react"

type CommentInputActionsProps = {
  onCancel: () => void
  onSubmit: () => void
}

const CommentInputActions = memo(
  ({ onCancel, onSubmit }: CommentInputActionsProps) => (
    <div className="mt-2 flex justify-end gap-x-4">
      <button className="text-cyan-500 underline" onClick={onCancel}>
        Cancel
      </button>
      <button className="text-cyan-500 underline" onClick={onSubmit}>
        Submit
      </button>
    </div>
  ),
)

export default CommentInputActions
