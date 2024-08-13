import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { search } from "./utils"
import CommentTile from "../CommentTile"
import useDebounce from "@/hooks/useDebounce"
import { Comment } from "@/types"

type SearchCommentsProps = {
  setIsSearch: Dispatch<SetStateAction<boolean>>
  isSearch: boolean
  comments: Comment[]
}

const SearchComments = ({ setIsSearch, comments, isSearch }: SearchCommentsProps) => {
  const [searchComments, setSearchComments] = useState(comments)
  const { debounce } = useDebounce()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchPhrase = e.target.value
    if (!searchPhrase) {
      setIsSearch(false)
      setSearchComments(comments)
      return
    }
    setIsSearch(true)
    debounce(() => {
      const filtered = search(comments, searchPhrase)
      setSearchComments(filtered)
    })
  }

  return (
    <>
      <div className="mb-4 rounded-md bg-zinc-200 p-2">
        <input
          className="block w-full rounded-md border p-[7px]"
          placeholder="Search comments"
          onChange={handleInputChange}
        />
      </div>

      {isSearch && searchComments.map((c) => (
        <CommentTile {...c} key={c.id} />
      ))}
    </>
  )
}

export default SearchComments
