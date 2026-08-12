import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Handle SPA redirect on page refresh if served via 404 fallback
const redirectPath = sessionStorage.getItem('spa_redirect')
if (redirectPath) {
  sessionStorage.removeItem('spa_redirect')
  window.history.replaceState(null, null, redirectPath)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
