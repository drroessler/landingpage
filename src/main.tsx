import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Bis zum Umzug auf Vercel liefen die Routen über HashRouter (#/impressum),
// weil GitHub Pages keine Rewrites kann. Geteilte Links dieser Form landen
// sonst auf der Startseite — deshalb werden sie einmalig übersetzt.
const hash = window.location.hash
if (hash.startsWith('#/')) {
  const target = hash.slice(1)
  window.history.replaceState(null, '', target + window.location.search)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
