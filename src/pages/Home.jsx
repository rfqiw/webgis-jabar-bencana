import { Link } from 'react-router-dom'
import { Map, AlertTriangle, Cloud, BarChart3, ExternalLink } from 'lucide-react'
import WeatherSlider from '../components/WeatherSlider'
import EmergencyContacts from '../components/EmergencyContacts'

const Home = () => {
  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="relative hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <AlertTriangle size={20} className="mr-2" />
              <span className="text-sm font-medium">Portal Resmi Kebencanaan</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              WebGIS Kebencanaan
              <span className="block text-blue-200">Jawa Barat</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              Akses informasi kebencanaan terintegrasi dengan 7 layer peta risiko,
              data cuaca real-time dari BMKG, dan analisis berbasis data resmi.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link
                to="/peta"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                <Map className="mr-2" />
                Jelajahi Peta
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                <BarChart3 className="mr-2" />
                Analisis Risiko
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Weather Section */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <WeatherSlider />
      </section>
      
      {/* Quick Summary Section */}
      <section className="container mx-auto px-4 mt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ringkasan Cepat</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 7 Layer Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Map className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold ml-4">7 Layer Kebencanaan</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Portal ini menampilkan 7 layer peta risiko bencana Jawa Barat dari data resmi ArcGIS.
            </p>
            <ul className="space-y-2">
              {[
                'Rawan Banjir',
                'Rawan Longsor', 
                'Rawan Gempa Bumi',
                'Rawan Tsunami',
                'Rawan Kebakaran Hutan',
                'Rawan Kekeringan',
                'Rawan Puting Beliung'
              ].map((layer, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  {layer}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Risk Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold ml-4">Ringkasan Risiko Wilayah</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Analisis risiko berdasarkan interpretasi legenda layer peta resmi.
              Data bersumber dari peta ArcGIS Instant.
            </p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risiko Tinggi</span>
                  <span className="font-semibold">15% Wilayah</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-1/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risiko Sedang</span>
                  <span className="font-semibold">35% Wilayah</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-2/5"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risiko Rendah</span>
                  <span className="font-semibold">50% Wilayah</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-1/2"></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              *Persentase berdasarkan interpretasi visual legenda peta
            </p>
          </div>
          
          {/* Weather Warning */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Cloud className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold ml-4">Peringatan Cuaca</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Pantau peringatan dini cuaca ekstrem dari BMKG untuk wilayah Jawa Barat.
            </p>
            <a
              href="https://www.bmkg.go.id/cuaca/peringatan-dini-cuaca/32"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              Lihat Peringatan Dini BMKG
              <ExternalLink size={16} className="ml-2" />
            </a>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <AlertTriangle className="text-yellow-600 mr-2" size={20} />
                <span className="font-semibold text-yellow-800">Informasi Penting</span>
              </div>
              <p className="text-sm text-yellow-700">
                BMKG telah mengintegrasikan AI untuk meningkatkan akurasi prediksi cuaca ekstrem di Indonesia [citation:9].
                Sistem ini mampu meningkatkan performa prediksi curah hujan hingga tiga jam ke depan.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Contacts */}
      <section className="container mx-auto px-4 mt-12">
        <EmergencyContacts />
      </section>
    </div>
  )
}

export default Home
