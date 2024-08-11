import { Comments } from "@/containers"
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => console.error(err), // TODO: Add error notifications
  }),
})

const App = () => {
  return (
    <div className="mx-auto flex max-w-[700px] flex-col px-4 pt-4">
      <QueryClientProvider client={queryClient}>
        <Comments />
      </QueryClientProvider>
    </div>
  )
}

export default App
