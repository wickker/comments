import { mc } from "@/utils/functions/common"
import { ChangeEvent, forwardRef } from "react"

type CommentInputProps = {
  input: string
  isInputVisible: boolean
  className?: string
  onCancel: () => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: () => void
}

const CommentInput = forwardRef(({
  input,
  isInputVisible,
  className,
  onChange,
  onCancel,
  onSubmit,
}: CommentInputProps) => {
  return (
    <>
      {isInputVisible && (
        <div className={mc("rounded-md bg-[#E4E8EF] p-2", className)}>
          {/* TODO: Change height depending on inital content */}
          <textarea
            className="block w-full rounded-md border p-[7px]"
            value={input}
            onChange={onChange}
          />
          {/* <div
            className="w-full whitespace-pre-wrap rounded-md border bg-white p-[7px]"
            contentEditable
            suppressContentEditableWarning
            onInput={onInput}
          >
            {input}
          </div> */}

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
})

export default CommentInput
