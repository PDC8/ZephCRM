import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CRM from './CRM.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CRM />
  </StrictMode>,
)
