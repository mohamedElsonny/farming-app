import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  )
}

export default App
