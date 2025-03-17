import Router from "./Router/router"
import './App.css'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { Toaster } from "sonner"
import Header from "./components/header/header"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        {/* <Header /> */}
        <Router />
      </div>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

export default App;
