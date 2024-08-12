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
import UpdateUser from './pages/UpdateUser';
import Settings from './pages/Settings';
import DeleteUser from './pages/DeleteUser';
import SearchPage from './pages/SearchPage';
import UnivPage from './pages/UnivPage';
import Recommendation from './pages/Recommendation';
import UserSearch from './pages/UserSearch';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />}/>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/profile/:userId' element={<Profile />}>
          <Route path='accountInfo' element={<AccountInfo />} />
          <Route path='basicInfo' element={<BasicInfo />} />
          <Route path='interests' element={<Interests />} />
          <Route path='academicSituation' element={<AcademicSituation />} />
          <Route path='dreamtUnis' element={<DreamtUnis />} />
        </Route>
        <Route path='/profile/:userId/updateUser' element={<UpdateUser />} />
        <Route path='/settings/:userId' element={<Settings />} />
        <Route path='/profile/:userId/deleteUser' element={<DeleteUser />} />
        <Route path='/university/:universityId' element={<UnivPage />} />
        <Route path='/recommendation' element={<Recommendation />} />
        <Route path='/search-users' element={<UserSearch />} />
        <Route path='/user/:userId' element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
