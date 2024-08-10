import { type Comment } from "@/types"
import { useState } from "react"

type CommentProps = Comment

export default function CommentTile({ comment, replies }: CommentProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-md bg-[#E4E8EF] p-2">
        <p className="whitespace-pre-wrap">{comment}</p>

        <div className="mt-2 flex gap-x-4">
          <button className="text-blue-700 underline">Reply</button>
          <button className="text-blue-700 underline">Edit</button>
          <button className="text-blue-700 underline">Delete</button>
          {replies.length > 0 && (
            <button
              className="text-blue-700 underline"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              {isExpanded ? "Hide" : "Show"} replies
            </button>
          )}
        </div>
      </div>

      <div className="pl-8">
        <div className="rounded-md bg-[#E4E8EF] p-2 mb-4">
          <textarea className='block rounded-md border p-2 w-full'/>
          <div className="mt-2 flex gap-x-4 justify-end">
            <button className="text-blue-500 underline">Cancel</button>
            <button className="text-blue-500 underline">Submit</button>
          </div>
        </div>

        {isExpanded &&
          replies.map((reply) => <CommentTile {...reply} key={reply.id} />)}
      </div>
    </div>
  )
}
