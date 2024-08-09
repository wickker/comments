import { type Comment } from "@/types"

type CommentProps = Comment

export default function Comment({ comment, replies }: CommentProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-[#E4E8EF] p-2 rounded-md">
        <p className='whitespace-pre-wrap'>{comment}</p>
      </div>
      <div className='pl-8'>
      {replies.map((reply) => (
        <Comment {...reply} />
      ))}
      </div>
    </div>
  )
}
