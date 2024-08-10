type CommentInputProps = {
  isInputVisible: boolean
  closeInput: () => void
}

export default function CommentInput({
  isInputVisible,
  closeInput,
}: CommentInputProps) {
  return (
    <>
      {isInputVisible && (
        <div className="mb-4 rounded-md bg-[#E4E8EF] p-2">
          <textarea className="block w-full rounded-md border p-2" />
          
          <div className="mt-2 flex justify-end gap-x-4">
            <button className="text-blue-500 underline" onClick={closeInput}>
              Cancel
            </button>
            <button className="text-blue-500 underline">Submit</button>
          </div>
        </div>
      )}
    </>
  )
}
