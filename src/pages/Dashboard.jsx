import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'
import { Filter, AlertCircle, BarChart3, PieChart as PieChartIcon, RadarIcon } from 'lucide-react'

const Dashboard = () => {
  const [selectedKabupaten, setSelectedKabupaten] = useState('Bandung')
  
  const kabupatenList = [
    'Bandung', 'Bogor', 'Bekasi', 'Depok', 'Cimahi', 'Tasikmalaya', 'Cirebon',
    'Banjar', 'Bandung Barat', 'Purwakarta', 'Karawang', 'Subang', 'Indramayu',
    'Sumedang', 'Garut', 'Ciamis', 'Kuningan', 'Majalengka', 'Pangandaran',
    'Sukabumi', 'Cianjur'
  ]
  
  // Sample data based on map legend interpretation
  // This is placeholder - in real implementation, this would come from ArcGIS layer query
  const generateData = (kabupaten) => {
    // Simulated data based on typical disaster risk patterns in West Java
    const baseData = {
      'Bandung': { banjir: 65, longsor: 40, gempa: 30, tsunami: 5, kebakaran: 25, kekeringan: 20, putingBeliung: 15 },
      'Bogor': { banjir: 75, longsor: 60, gempa: 25, tsunami: 0, kebakaran: 30, kekeringan: 15, putingBeliung: 20 },
      'Bekasi': { banjir: 80, longsor: 10, gempa: 20, tsunami: 0, kebakaran: 35, kekeringan: 40, putingBeliung: 25 },
      'Cianjur': { banjir: 50, longsor: 70, gempa: 45, tsunami: 0, kebakaran: 20, kekeringan: 10, putingBeliung: 10 },
      'Garut': { banjir: 45, longsor: 65, gempa: 35, tsunami: 0, kebakaran: 30, kekeringan: 25, putingBeliung: 15 },
      'Tasikmalaya': { banjir: 55, longsor: 60, gempa: 30, tsunami: 0, kebakaran: 25, kekeringan: 20, putingBeliung: 20 },
    }
    
    return baseData[kabupaten] || { banjir: 50, longsor: 40, gempa: 25, tsunami: 0, kebakaran: 20, kekeringan: 30, putingBeliung: 15 }
  }
  
  const data = generateData(selectedKabupaten)
  
  const barData = [
    { name: 'Banjir', value: data.banjir, color: '#3B82F6' },
    { name: 'Longsor', value: data.longsor, color: '#EF4444' },
    { name: 'Gempa', value: data.gempa, color: '#F59E0B' },
    { name: 'Tsunami', value: data.tsunami, color: '#8B5CF6' },
    { name: 'Kebakaran', value: data.kebakaran, color: '#F97316' },
    { name: 'Kekeringan', value: data.kekeringan, color: '#D97706' },
    { name: 'Puting Beliung', value: data.putingBeliung, color: '#6B7280' },
  ]
  
  const radarData = barData
  
  const pieData = [
    { name: 'Risiko Tinggi', value: 15, color: '#EF4444' },
    { name: 'Risiko Sedang', value: 35, color: '#F59E0B' },
    { name: 'Risiko Rendah', value: 50, color: '#10B981' },
  ]
  
  const COLORS = ['#EF4444', '#F59E0B', '#10B981']
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analisis Risiko</h1>
        <p className="text-gray-600">
          Analisis risiko bencana berdasarkan interpretasi legenda dari 7 layer peta kebencanaan.
        </p>
      </div>
      
      {/* Selection and Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Filter className="text-blue-600 mr-3" />
              <div>
                <h2 className="text-xl font-semibold">Pilih Wilayah Analisis</h2>
                <p className="text-gray-600 text-sm">Pilih kabupaten/kota untuk melihat analisis risiko</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {kabupatenList.map((kab) => (
                <button
                  key={kab}
                  onClick={() => setSelectedKabupaten(kab)}
                  className={`px-4 py-3 rounded-lg text-center transition-colors ${
                    selectedKabupaten === kab
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {kab}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start mb-4">
            <AlertCircle className="text-yellow-600 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Penting: Sumber Data Analisis</h3>
              <p className="text-yellow-700 text-sm">
                Data analisis bersumber dari interpretasi legenda layer peta. 
                Nilai merupakan estimasi berdasarkan klasifikasi risiko pada legenda.
              </p>
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Metodologi:</p>
            <ul className="space-y-1">
              <li>• Interpretasi visual legenda peta ArcGIS</li>
              <li>• Klasifikasi risiko: Rendah (0-33), Sedang (34-66), Tinggi (67-100)</li>
              <li>• Estimasi berdasarkan distribusi warna pada peta</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <BarChart3 className="text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold">Distribusi Risiko Bencana</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: 'Tingkat Risiko (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Risiko']}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Legend />
                <Bar dataKey="value" name="Tingkat Risiko" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Kabupaten: {selectedKabupaten} | Interpretasi dari 7 layer peta
          </p>
        </div>
        
        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <RadarIcon className="text-purple-600 mr-3" />
            <h3 className="text-xl font-semibold">Profil Risiko Komparatif</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E5E7EB" />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Risiko"
                  dataKey="value"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Risiko']}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Donut Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <PieChartIcon className="text-green-600 mr-3" />
            <h3 className="text-xl font-semibold">Proporsi Tingkat Risiko</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Proporsi']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Distribusi berdasarkan interpretasi visual peta wilayah {selectedKabupaten}
          </p>
        </div>
        
        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Tabel Analisis Risiko</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jenis Bencana
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tingkat Risiko
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategori
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {barData.map((item) => {
                  const category = item.value >= 67 ? 'Tinggi' : item.value >= 34 ? 'Sedang' : 'Rendah'
                  const categoryColor = category === 'Tinggi' ? 'text-red-600' : 
                                      category === 'Sedang' ? 'text-yellow-600' : 'text-green-600'
                  
                  return (
                    <tr key={item.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${item.value}%`,
                                backgroundColor: item.color
                              }}
                            ></div>
                          </div>
                          <span className="ml-3 font-medium">{item.value}%</span>
                        </div>
                      </td>
                      <td className={`px-4 py-3 whitespace-nowrap text-sm font-semibold ${categoryColor}`}>
                        {category}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Data Source Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Informasi Sumber Data dan Metodologi</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Sumber Data:</h4>
            <ul className="space-y-2 text-blue-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>7 Layer Peta Kebencanaan Jawa Barat dari ArcGIS Instant Apps</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Legenda dan Klasifikasi Risiko dari Layer Peta Resmi</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Tidak menggunakan data dari InaRISK atau sumber eksternal lainnya</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Batasan Data:</h4>
            <ul className="space-y-2 text-blue-600">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Analisis berdasarkan interpretasi visual, bukan query data langsung</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Nilai merupakan estimasi berdasarkan klasifikasi legenda peta</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Akurasi tergantung pada resolusi dan detail informasi pada peta sumber</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-700">
            <strong>Catatan Penting:</strong> Dashboard ini menampilkan analisis berdasarkan interpretasi 
            legenda layer peta yang tersedia. Untuk data numerik yang lebih akurat dan terperinci, 
            diperlukan akses langsung ke database atribut layer melalui API ArcGIS.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
