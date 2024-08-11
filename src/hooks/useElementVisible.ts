import { useEffect, useRef } from "react"

const useElementVisible = (callback: () => void) => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          callback()
        }
      },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [observerRef, callback])

  return {
    observerRef,
  }
}

export default useElementVisible
