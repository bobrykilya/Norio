import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './Store/store'
import AuthProvider from "./context/AuthContext"



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>
)