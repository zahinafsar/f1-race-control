import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@fontsource-variable/geist'
import { RaceDashboard } from './component/race-dashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RaceDashboard />
  </StrictMode>,
)
