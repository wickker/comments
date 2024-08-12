import { ChangeEvent, FocusEvent, PropsWithChildren } from "react"
import { mc } from "@/utils/functions/common"

type CommentInputProps = {
  input: string
  className?: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & PropsWithChildren

const CommentInput = ({
  input,
  className,
  onChange,
  children,
}: CommentInputProps) => {
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) =>
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    )

  return (
    <div className={mc("rounded-md bg-[#E4E8EF] p-2", className)}>
      {/* TODO: Change height depending on inital content */}
      <textarea
        className="block w-full rounded-md border p-[7px]"
        value={input}
        onChange={onChange}
        ref={(ref) => ref && ref.focus()}
        onFocus={handleFocus}
      />
      {children}
    </div>
  )
}

export default CommentInput
