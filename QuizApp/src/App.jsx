import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './components/signup'
import { Signin } from './components/signin'
import { Quizzes } from './components/quizzes'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/signup' element = {<Signup />}/>
        <Route path='/signin' element = {<Signin />}/>
        <Route path='/user/quizzes' element = {<Quizzes />}/>
      </Routes>
    </Router>
  )
}

export default App
