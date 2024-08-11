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
    <div className="mx-auto max-w-[700px] p-4 min-h-[100dvh] flex flex-col">
      <QueryClientProvider client={queryClient}>
        <Comments />
      </QueryClientProvider>
    </div>
  )
}

export default App
