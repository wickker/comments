import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { Comments } from "@/containers"

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => console.error(err), // TODO: Add error notifications
  }),
})

const App = () => {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-[700px] flex-col p-4">
      <QueryClientProvider client={queryClient}>
        <Comments />
      </QueryClientProvider>
    </div>
  )
}

export default App
