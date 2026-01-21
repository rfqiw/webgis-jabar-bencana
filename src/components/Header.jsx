import { Link, useLocation } from 'react-router-dom'
import { Map, Home, BarChart3, Newspaper, AlertTriangle } from 'lucide-react'

const Header = () => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: <Home size={20} />, label: 'Beranda' },
    { path: '/peta', icon: <Map size={20} />, label: 'Peta' },
    { path: '/dashboard', icon: <BarChart3 size={20} />, label: 'Dashboard' },
    { path: '/berita', icon: <Newspaper size={20} />, label: 'Berita' },
  ]
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WebGIS Kebencanaan Jabar</h1>
              <p className="text-sm text-gray-600">Portal Informasi Resmi</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
