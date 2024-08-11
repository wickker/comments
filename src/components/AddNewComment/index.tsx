import { Comment } from "@/types"
import { ChangeEvent, memo, useState } from "react"

type AddNewCommentProps = {
  addNewComment: (newComment: Comment) => void
}

const AddNewComment = memo(({ addNewComment }: AddNewCommentProps) => {
  const [input, setInput] = useState("")

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value)

  const handleSubmit = () => {
    addNewComment({
      id: Date.now(),
      comment: input,
      replies: [],
    })
    setInput("")
  }

  return (
    <div className="mb-4 flex flex-col rounded-md bg-zinc-200 p-2">
      <textarea
        className="block w-full rounded-md border p-[7px]"
        placeholder="Leave a comment"
        value={input}
        onChange={handleInputChange}
      />

      <button
        className="mb-2 me-2 mt-2 w-fit self-end rounded-full bg-gray-800 px-5 py-2.5 text-white hover:bg-gray-900"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  )
})

export default AddNewComment
