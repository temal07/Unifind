import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
