import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import installClickGuard from './clickGuard.js'

// One action per human click burst: repeated clicks on the same button are dropped.
installClickGuard()

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
