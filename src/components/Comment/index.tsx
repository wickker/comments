import { type Comment } from "@/App"

type CommentProps = Comment

export default function Comment({ name, comment, replies }: CommentProps) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="bg-yellow-400">
        <p>{name}</p>
        <p>{comment}</p>
      </div>
      <div className='pl-8'>
      {replies.map((reply) => (
        <Comment {...reply} />
      ))}
      </div>
    </div>
  )
}
