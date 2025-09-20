import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./context/AuthContext"
import { auth } from "./firebase.js"
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import WalletContextProvider from './context/WalletContext.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider auth={auth}>
        <WalletContextProvider>
            <App />
            <Toaster position="top-center" reverseOrder={false} />
        </WalletContextProvider>
    </AuthProvider>
)