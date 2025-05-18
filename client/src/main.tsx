import React from 'react'

import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import AuthProvider from './context/Auth-context'
import GlobalProvider from './context/Global-context'
import { queryClient } from './http/tanstackQuery-client'
import { QueryClientProvider } from '@tanstack/react-query'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// <StrictMode>
	<QueryClientProvider client={queryClient}>
		<GlobalProvider>
			<AuthProvider>
				<BrowserRouter>
					<App />
					{/*<ReactQueryDevtools initialIsOpen={false} />*/}
				</BrowserRouter>
			</AuthProvider>
		</GlobalProvider>
	</QueryClientProvider>,
	// </StrictMode>
)