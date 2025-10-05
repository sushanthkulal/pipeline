import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserLogin from './pages/UserLogin'
import PanchayatLogin from './pages/PanchayatLogin'
import AboutUs from './pages/AboutUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user_login" element={<UserLogin />} />
        <Route path="/panchayat_login" element={<PanchayatLogin />} />
        <Route path="/about_us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
