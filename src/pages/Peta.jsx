import { useState } from 'react'
import { MapPin, Layers, Info, Maximize2, Globe } from 'lucide-react'

const Peta = () => {
  const [activeTab, setActiveTab] = useState('2d')
  
  const peta2DUrl = "https://www.arcgis.com/apps/instant/atlas/index.html?appid=af6cc543bcc2468ea0cee2506814abf7"
  const peta3DUrl = "https://www.arcgis.com/apps/instant/3dviewer/index.html?appid=b522ca6443e64aaf8583e9a5f2af3eaf"
  
  const layersInfo = [
    {
      name: "Rawan Banjir",
      description: "Daerah dengan potensi genangan air akibat curah hujan tinggi atau luapan sungai",
      color: "bg-blue-500"
    },
    {
      name: "Rawan Longsor",
      description: "Daerah dengan kemiringan lereng curam dan kondisi tanah rentan pergerakan",
      color: "bg-red-500"
    },
    {
      name: "Rawan Gempa Bumi",
      description: "Wilayah dekat sesar aktif dengan potensi guncangan seismik",
      color: "bg-orange-500"
    },
    {
      name: "Rawan Tsunami",
      description: "Wilayah pesisir dengan risiko gelombang laut akibat gempa bawah laut",
      color: "bg-purple-500"
    },
    {
      name: "Rawan Kebakaran Hutan",
      description: "Area dengan vegetasi kering dan kondisi cuaca mendukung penyebaran api",
      color: "bg-yellow-500"
    },
    {
      name: "Rawan Kekeringan",
      description: "Daerah dengan curah hujan rendah dan ketersediaan air terbatas",
      color: "bg-brown-500"
    },
    {
      name: "Rawan Puting Beliung",
      description: "Wilayah dengan kondisi atmosfer mendukung pembentukan angin puting beliung",
      color: "bg-gray-500"
    }
  ]
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Peta Kebencanaan Jawa Barat</h1>
        <p className="text-gray-600">
          Visualisasi 7 layer risiko bencana dalam format 2D dan 3D. Data bersumber dari ArcGIS Instant Apps.
        </p>
      </div>
      
      {/* Layer Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center mb-6">
          <Layers className="text-blue-600 mr-3" />
          <h2 className="text-xl font-semibold">7 Layer Kebencanaan</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {layersInfo.map((layer, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className={`w-4 h-4 rounded-full ${layer.color} mr-3`}></div>
                <span className="font-semibold">{layer.name}</span>
              </div>
              <p className="text-sm text-gray-600">{layer.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <Info className="text-blue-600 mr-3" />
            <p className="text-sm text-blue-800">
              Layer-layer ini ditampilkan secara langsung dari sumber data ArcGIS Instant Apps.
              Tidak ada layer eksternal yang ditambahkan.
            </p>
          </div>
        </div>
      </div>
      
      {/* Map Tabs */}
      <div className="mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('2d')}
            className={`px-6 py-3 font-medium text-lg flex items-center ${
              activeTab === '2d'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Globe className="mr-2" size={20} />
            Peta 2D
          </button>
          <button
            onClick={() => setActiveTab('3d')}
            className={`px-6 py-3 font-medium text-lg flex items-center ${
              activeTab === '3d'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Maximize2 className="mr-2" size={20} />
            Peta 3D
          </button>
        </div>
      </div>
      
      {/* 2D Map */}
      {activeTab === '2d' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Peta Rawan Bencana Jawa Barat 2D</h3>
                </div>
                <a
                  href={peta2DUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Buka di Tab Baru
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="relative" style={{ height: '600px' }}>
              <iframe
                src={peta2DUrl}
                className="absolute inset-0 w-full h-full border-0"
                title="Peta Kebencanaan Jawa Barat 2D"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/70 text-white text-sm px-3 py-2 rounded-lg">
                  Sumber: ArcGIS Instant Apps
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t">
              <h4 className="font-semibold mb-3">Informasi Peta 2D:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Menampilkan distribusi spasial 7 jenis risiko bencana di Jawa Barat</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Setiap layer dapat diaktifkan/nonaktifkan sesuai kebutuhan analisis</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Legenda warna menunjukkan tingkat risiko (Rendah, Sedang, Tinggi)</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                  <span>Klik pada area tertentu untuk melihat detail informasi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* 3D Map */}
      {activeTab === '3d' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Maximize2 className="text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold">Peta Rawan Bencana Jawa Barat 3D</h3>
                </div>
                <a
                  href={peta3DUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Buka di Tab Baru
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="relative" style={{ height: '600px' }}>
              <iframe
                src={peta3DUrl}
                className="absolute inset-0 w-full h-full border-0"
                title="Peta Kebencanaan Jawa Barat 3D"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4">
                <div className="bg-black/70 text-white text-sm px-3 py-2 rounded-lg">
                  Sumber: ArcGIS Instant Apps
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t">
              <h4 className="font-semibold mb-3">Informasi Peta 3D:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span>Visualisasi 3D memperlihatkan hubungan antara topografi dan risiko bencana</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span>Dapat melihat kemiringan lereng yang berpengaruh pada risiko longsor</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span>Navigasi bebas untuk melihat dari berbagai sudut dan ketinggian</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                  <span>Layer dapat diatur transparansinya untuk analisis yang lebih mendalam</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Source Notice */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start">
          <Info className="text-yellow-600 mr-3 mt-1" />
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Pernyataan Sumber Data</h4>
            <p className="text-yellow-700 mb-3">
              Peta-peta di atas ditampilkan secara langsung dari ArcGIS Instant Apps melalui iframe.
              Tidak ada modifikasi atau penambahan layer yang dilakukan.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">Sumber Data 2D:</p>
                <a href={peta2DUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-all">
                  {peta2DUrl}
                </a>
              </div>
              <div>
                <p className="font-medium mb-1">Sumber Data 3D:</p>
                <a href={peta3DUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 break-all">
                  {peta3DUrl}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Peta
