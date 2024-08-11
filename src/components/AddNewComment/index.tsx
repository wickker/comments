const AddNewComment = () => {
  return (
    <div className="mb-4 flex flex-col rounded-md bg-zinc-200 p-2">
      <textarea
        className="block w-full rounded-md border p-[7px]"
        placeholder="Leave a comment"
      />

      <button className="mb-2 me-2 mt-2 w-fit self-end rounded-full bg-gray-800 px-5 py-2.5 text-white hover:bg-gray-900">
        Submit
      </button>
    </div>
  )
}

export default AddNewComment
