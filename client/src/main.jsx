import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalProvider from './context/Global-context'
import AuthProvider from "./context/Auth-context"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom"


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <QueryClientProvider client={queryClient}>
        <GlobalProvider>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </GlobalProvider>
    </QueryClientProvider>
)