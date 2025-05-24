import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Aura from './Aura.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Aura />
  </StrictMode>,
)
