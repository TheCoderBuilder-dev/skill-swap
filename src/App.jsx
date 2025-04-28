import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import SkillList from './components/SkillList'
import AddSkill from './components/AddSkill'
import Profile from './components/Profile'
import SkillDetails from './components/SkillDetails'
import Messages from './components/Messages'
import Dashboard from './components/Dashboard'
import Notifications from './components/Notifications'
import SkillSwap from './components/SkillSwap'
import Reviews from './components/Reviews'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/skills/:id" element={<SkillDetails />} />
            <Route path="/skills/swap/:id" element={<SkillSwap />} />
            <Route path="/add-skill" element={<AddSkill />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/reviews/:id" element={<Reviews />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </main>
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  )
}

export default App
