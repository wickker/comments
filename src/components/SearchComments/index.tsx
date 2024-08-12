import useDebounce from "@/hooks/useDebounce"

type SearchCommentsProps = {
    
}

const SearchComments = () => {
  const { debounce } = useDebounce()

  return (
    <div className="rounded-md bg-zinc-200 p-2 mb-4">
      <input className="block w-full rounded-md border p-[7px]" placeholder="Search comments"/>
    </div>
  )
}

export default SearchComments
