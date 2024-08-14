import { forwardRef, memo } from "react"
import { FiLoader } from "react-icons/fi"

type InfiniteScrollProps = {
  isLoading: boolean
}

const InfiniteScroll = memo(forwardRef<HTMLDivElement, InfiniteScrollProps>(
  ({ isLoading }: InfiniteScrollProps, ref) => (
    <>
      {isLoading ? (
        <div className="grid place-items-center">
          <FiLoader className="animate-spin text-2xl text-neutral-400" />
        </div>
      ) : (
        <div ref={ref} />
      )}
    </>
  ),
))

export default InfiniteScroll
