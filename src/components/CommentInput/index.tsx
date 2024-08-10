import { ChangeEvent} from "react"

type CommentInputProps = {
  input: string
  isInputVisible: boolean
  onClose: () => void
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export default function CommentInput({
  input,
  isInputVisible,
  onChange,
  onClose,
}: CommentInputProps) {
  return (
    <>
      {isInputVisible && (
        <div className="mb-4 rounded-md bg-[#E4E8EF] p-2">
          <textarea
            className="block w-full rounded-md border p-2"
            value={input}
            onChange={onChange}
          />

          <div className="mt-2 flex justify-end gap-x-4">
            <button className="text-blue-500 underline" onClick={onClose}>
              Cancel
            </button>
            <button className="text-blue-500 underline">Submit</button>
          </div>
        </div>
      )}
    </>
  )
}
