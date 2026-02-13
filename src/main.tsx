import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppWithRedux } from './AppWithRedux.tsx'
// import App from './App.tsx'
// import HeroSection from './components/HeroSection.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithRedux />
  </StrictMode>,
)
