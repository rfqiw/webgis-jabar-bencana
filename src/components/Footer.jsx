import { Phone, Shield, AlertCircle } from 'lucide-react'

const Footer = () => {
  const emergencyContacts = [
    { number: '112', label: 'Darurat Nasional', color: 'text-red-600' },
    { number: '110', label: 'Kepolisian RI', color: 'text-blue-600' },
    { number: '113', label: 'Pemadam Kebakaran', color: 'text-orange-600' },
    { number: '119', label: 'Layanan Kesehatan', color: 'text-green-600' },
    { number: '115', label: 'Basarnas', color: 'text-purple-600' },
    { number: '129', label: 'BNPB', color: 'text-yellow-600' },
  ]
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Emergency Contacts */}
      <div className="bg-gradient-to-r from-red-900 to-orange-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="mr-2" />
            <h3 className="text-lg font-semibold">KONTAK DARURAT</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {emergencyContacts.map((contact) => (
              <div key={contact.number} className="text-center">
                <div className={`text-2xl font-bold ${contact.color}`}>{contact.number}</div>
                <div className="text-sm mt-1">{contact.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-300 mt-4">
            Gunakan layanan ini hanya dalam kondisi darurat.
          </p>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="mr-2" />
              <h3 className="text-xl font-bold">Portal WebGIS Kebencanaan Jabar</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Website ini menampilkan 7 layer kebencanaan Jawa Barat dari sumber data resmi.
              Data diperbarui secara berkala dan bersumber langsung dari instansi terkait.
            </p>
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3">
              <p className="text-sm text-yellow-200">
                ⚠️ PERINGATAN: Website dalam versi beta. Data dapat berubah sewaktu-waktu.
                Selalu verifikasi informasi dengan sumber resmi.
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Sumber Data</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                ArcGIS Instant Apps
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                BNPB (Badan Nasional Penanggulangan Bencana)
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                BPBD Jawa Barat
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                Pemerintah Provinsi Jawa Barat
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Kredit & Pengembangan</h4>
            <div className="bg-gray-800 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">
                Dikembangkan sebagai portal informasi kebencanaan terintegrasi
                untuk Provinsi Jawa Barat.
              </p>
              <div className="border-t border-gray-700 pt-3">
                <p className="text-sm">
                  <strong>Author:</strong> Rifqi Gusfiliandi
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Senior Product Engineer & UI/UX Designer
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Portal WebGIS Kebencanaan Jawa Barat. Seluruh data bersumber dari instansi resmi.</p>
          <p className="mt-1">Data terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
