import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Peta from './pages/Peta'
import Dashboard from './pages/Dashboard'
import Berita from './pages/Berita'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peta" element={<Peta />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/berita" element={<Berita />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
