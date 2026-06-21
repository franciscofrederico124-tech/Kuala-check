import React from 'react'
import ReactDOM from 'react-dom/client'
import Main from './routes/mainRoute'
import './index.css'
import "bootstrap-icons/font/bootstrap-icons.css";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
