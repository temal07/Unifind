import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Profile from './pages/Profile';
import AccountInfo from './components/AccountInfo';
import BasicInfo from './components/BasicInfo';
import Interests from './components/Interests';
import AcademicSituation from './components/AcademicSituation';
import DreamtUnis from './components/DreamtUnis';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />}/>
        <Route path='/profile/:userId' element={<Profile />}>
          <Route path='accountInfo' element={<AccountInfo />} />
          <Route path='basicInfo' element={<BasicInfo />} />
          <Route path='interests' element={<Interests />} />
          <Route path='academicSituation' element={<AcademicSituation />} />
          <Route path='dreamtUnis' element={<DreamtUnis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
