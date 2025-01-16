import React from "react"
import ReactDOM from 'react-dom/client'
import App from './App'
import GlobalProvider from './context/Global-context'
import AuthProvider from "./context/Auth-context"
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from "react-router-dom"
import { queryClient } from "./http/tanstackQuery-client"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <QueryClientProvider client={queryClient}>
        <GlobalProvider>
            <AuthProvider>
                <BrowserRouter>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} />
                </BrowserRouter>
            </AuthProvider>
        </GlobalProvider>
    </QueryClientProvider>
)