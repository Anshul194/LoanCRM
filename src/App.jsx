import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import './App.css'
import Dashboard from './pages/Dashboard.jsx'
import Leads from './pages/Leads.jsx'
import Enquiry from './pages/Enquiry.jsx'
import Campaigns from './pages/Campaigns.jsx'
import CreateLead from './pages/CreateLead.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/enquiry" element={<Enquiry/>} />
        <Route path="/campaigns" element={<Campaigns/>} />
        <Route path="/create-lead" element={<CreateLead />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
