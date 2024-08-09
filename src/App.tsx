import { Comment } from "./components"

export type Comment = {
  id: number
  name: string
  comment: string
  replies: Comment[]
}

const comments: Comment[] = [
  {
    id: 1,
    name: "Name1",
    comment: "Comment1",
    replies: [
      {
        id: 2,
        name: "Name2",
        comment: "Comment2",
        replies: [],
      },
      {
        id: 3,
        name: "Name3",
        comment: "Comment3",
        replies: [],
      },
      {
        id: 4,
        name: "Name4",
        comment: "Comment4",
        replies: [],
      },
      {
        id: 8,
        name: "Name8",
        comment: "Comment8",
        replies: [
          {
            id: 5,
            name: "Name5",
            comment: "Comment5",
            replies: [],
          },
          {
            id: 6,
            name: "Name6",
            comment: "Comment6",
            replies: [],
          },
        ],
      },
    ],
  },
  { id: 7, name: "Name7", comment: "Comment7", replies: [] },
]

export default function App() {
  return (
    <div className='mx-auto max-w-xl flex flex-col bg-purple-500 p-4'>
      {comments.map((c) => (
        <Comment {...c} />
      ))}
    </div>
  )
}
