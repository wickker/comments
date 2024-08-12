const useDebounce = () => {
    let timer: NodeJS.Timeout
  
    const debounce = (callback: () => void, duration = 500) => {
      clearTimeout(timer)
      timer = setTimeout(callback, duration)
    }
  
    return {
      debounce,
    }
  }
  
  export default useDebounce