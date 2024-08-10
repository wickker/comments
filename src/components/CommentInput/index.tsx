import { mc } from "@/utils/functions/common"
import { ChangeEvent } from "react"

type CommentInputProps = {
  input: string
  isInputVisible: boolean
  className?: string
  onCancel: () => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
}

export default function CommentInput({
  input,
  isInputVisible,
  className,
  onChange,
  onCancel,
  onSubmit,
}: CommentInputProps) {
  return (
    <>
      {isInputVisible && (
        <div className={mc("rounded-md bg-[#E4E8EF] p-2", className)}>
          <textarea
            className="block w-full rounded-md border p-2"
            value={input}
            onChange={onChange}
          />

          <div className="mt-2 flex justify-end gap-x-4">
            <button className="text-cyan-500 underline" onClick={onCancel}>
              Cancel
            </button>
            <button className="text-cyan-500 underline" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  )
}
