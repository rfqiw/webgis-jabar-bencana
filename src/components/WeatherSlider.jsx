import { useState, useEffect, useRef } from 'react'
import { Thermometer, Wind, Droplets, Cloud, AlertCircle, RefreshCw } from 'lucide-react'

const WeatherSlider = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const autoPlayRef = useRef(null)
  
  const kabupatenKota = [
    'Bandung', 'Bogor', 'Bekasi', 'Depok', 'Cimahi', 'Tasikmalaya', 'Cirebon',
    'Banjar', 'Bandung Barat', 'Purwakarta', 'Karawang', 'Subang', 'Indramayu',
    'Sumedang', 'Garut', 'Ciamis', 'Kuningan', 'Majalengka', 'Pangandaran',
    'Sukabumi', 'Cianjur'
  ]
  
  useEffect(() => {
    fetchWeatherData()
    
    // Auto-play slider
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % kabupatenKota.length)
    }, 5000)
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [])
  
  const fetchWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch real data from BMKG XML
      const response = await fetch('https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaBarat.xml')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const xmlText = await response.text()
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
      
      // Parse XML data
      const areas = xmlDoc.getElementsByTagName('area')
      const parsedData = []
      
      for (let i = 0; i < Math.min(areas.length, kabupatenKota.length); i++) {
        const area = areas[i]
        const name = area.getAttribute('description') || kabupatenKota[i]
        
        // Get weather parameters
        const parameters = area.getElementsByTagName('parameter')
        let temp = 'N/A'
        let humidity = 'N/A'
        let windSpeed = 'N/A'
        let weather = 'Cerah'
        
        for (let param of parameters) {
          const id = param.getAttribute('id')
          const value = param.getElementsByTagName('value')[0]?.textContent
          
          switch(id) {
            case 't':
              temp = value ? `${value}°C` : 'N/A'
              break
            case 'hu':
              humidity = value ? `${value}%` : 'N/A'
              break
            case 'ws':
              windSpeed = value ? `${value} km/jam` : 'N/A'
              break
            case 'weather':
              weather = value || 'Cerah'
              break
          }
        }
        
        parsedData.push({
          name,
          temperature: temp,
          humidity,
          windSpeed,
          condition: weather,
          timestamp: new Date().toLocaleTimeString('id-ID')
        })
      }
      
      setWeatherData(parsedData)
    } catch (err) {
      console.error('Error fetching weather data:', err)
      setError(`Gagal mengambil data cuaca: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }
  
  const handlePrev = () => {
    setCurrentIndex(prev => prev === 0 ? kabupatenKota.length - 1 : prev - 1)
    resetAutoPlay()
  }
  
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % kabupatenKota.length)
    resetAutoPlay()
  }
  
  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % kabupatenKota.length)
    }, 5000)
  }
  
  const getWeatherIcon = (condition) => {
    const cond = condition?.toLowerCase() || ''
    if (cond.includes('hujan')) return '🌧️'
    if (cond.includes('cerah')) return '☀️'
    if (cond.includes('mendung')) return '☁️'
    if (cond.includes('badai')) return '⛈️'
    return '⛅'
  }
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="animate-spin text-blue-600 mr-3" />
          <p className="text-gray-600">Memuat data cuaca dari BMKG...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Gagal Memuat Data Cuaca</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <a
            href="https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-JawaBarat.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            Buka Data BMKG Langsung
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    )
  }
  
  const currentWeather = weatherData?.[currentIndex] || {
    name: kabupatenKota[currentIndex],
    temperature: 'Data tidak tersedia',
    humidity: 'Data tidak tersedia',
    windSpeed: 'Data tidak tersedia',
    condition: 'Data tidak tersedia',
    timestamp: 'N/A'
  }
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Prakiraan Cuaca Jawa Barat</h2>
          <p className="text-gray-600">Data cuaca bersumber langsung dari BMKG dan diperbarui secara berkala.</p>
        </div>
        <button
          onClick={fetchWeatherData}
          className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw size={18} />
          <span>Refresh</span>
        </button>
      </div>
      
      {/* Weather Card */}
      <div 
        className="bg-white rounded-xl p-6 mb-6 relative overflow-hidden"
        onMouseEnter={() => autoPlayRef.current && clearInterval(autoPlayRef.current)}
        onMouseLeave={() => resetAutoPlay()}
      >
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <span className="text-5xl mr-4">{getWeatherIcon(currentWeather.condition)}</span>
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{currentWeather.name}</h3>
                <p className="text-gray-500">Update: {currentWeather.timestamp}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Thermometer className="text-red-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Suhu</p>
                  <p className="text-xl font-semibold">{currentWeather.temperature}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Droplets className="text-blue-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Kelembapan</p>
                  <p className="text-xl font-semibold">{currentWeather.humidity}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Wind className="text-green-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Kecepatan Angin</p>
                  <p className="text-xl font-semibold">{currentWeather.windSpeed}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Cloud className="text-gray-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Kondisi</p>
                  <p className="text-xl font-semibold">{currentWeather.condition}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slider Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex space-x-2">
          {kabupatenKota.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                resetAutoPlay()
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WeatherSlider
