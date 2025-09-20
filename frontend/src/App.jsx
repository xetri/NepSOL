import { BrowserRouter, Routes, Route } from 'react-router'

import Home from "./pages/Home"
import Login from './pages/Auth/CreatorLogin'
import NotFound from "./pages/NotFound"
import DashBoard from './Components/Dashboard/Dash'
import Profile from './Components/Profile/Profile'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
