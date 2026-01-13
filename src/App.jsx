// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from './components/ui/Toaster'

// Layout
import Header from './components/Header'

// Pages
import Home from './pages/Home'
import Play from './pages/Play'
import HowToPlay from './pages/HowToPlay'
import Stats from './pages/Stats'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          
          <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/play" element={<Play />} />
              <Route path="/how-to-play" element={<HowToPlay />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="text-center py-4 text-gray-500 text-sm">
            Made with ❤️ | Fragmentle © {new Date().getFullYear()}
          </footer>
        </div>
        
        <Toaster />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App