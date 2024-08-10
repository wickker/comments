import { mc } from "@/utils/functions/common"
import { ChangeEvent, FocusEvent } from "react"
import { CommentInputActions } from "@/components"

type CommentInputProps = {
  input: string
  isInputVisible: boolean
  className?: string
  onCancel: () => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
}

const CommentInput = ({
  input,
  isInputVisible,
  className,
  onChange,
  onCancel,
  onSubmit,
}: CommentInputProps) => {
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) =>
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    )

  return (
    <>
      {isInputVisible && (
        <div className={mc("rounded-md bg-[#E4E8EF] p-2", className)}>
          {/* TODO: Change height depending on inital content */}
          <textarea
            className="block w-full rounded-md border p-[7px]"
            value={input}
            onChange={onChange}
            ref={(ref) => isInputVisible && ref && ref.focus()}
            onFocus={handleFocus}
          />

          <CommentInputActions onCancel={onCancel} onSubmit={onSubmit} />
        </div>
      )}
    </>
  )
}

export default CommentInput
