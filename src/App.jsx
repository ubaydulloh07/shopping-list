
import Router from "./Router/router"
import './App.css'
import { QueryClientProvider  , QueryClient} from "@tanstack/react-query"
import { Toaster } from "sonner"

const queryClient = new QueryClient()
function App() {
  

  return (
  <QueryClientProvider client={queryClient}>
    <Router />
    <Toaster richColors position="top-right" />
  </QueryClientProvider>
  )
}

export default App
