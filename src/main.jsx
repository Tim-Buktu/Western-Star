import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Router from './components/Router'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)