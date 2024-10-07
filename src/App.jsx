import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import StreamingPlatform from './Views/cin'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <StreamingPlatform/>
    </>
  )
}

export default App
