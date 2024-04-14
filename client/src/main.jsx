import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from "./context/Auth-context"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </QueryClientProvider>
)