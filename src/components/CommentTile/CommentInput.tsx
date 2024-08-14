import { ChangeEvent, FocusEvent, PropsWithChildren, useState } from "react"
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
  const [textAreaHeight, setTextAreaHeight] = useState(0) 

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length,
    )
    setTextAreaHeight(input ? e.target.scrollHeight : 62) // 62 for 2 rows
  }

  return (
    <div className={mc("rounded-md bg-[#E4E8EF] p-2", className)}>
      <textarea
        className="block w-full rounded-md border p-[7px]"
        value={input}
        onChange={onChange}
        ref={(ref) => ref && ref.focus()}
        onFocus={handleFocus}
        style={{ height: `${textAreaHeight + 2}px` }}
      />
      {children}
    </div>
  )
}

export default CommentInput
