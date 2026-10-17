import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useGLTF } from '@react-three/drei'
import { App } from './app/App.jsx'
import './styles/index.css'

useGLTF.setDecoderPath('/draco/')
useGLTF.preload('/three/setup_3D-transformed.glb', '/draco/')
useGLTF.preload('/three/modelo_siliezar.glb', '/draco/')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
