import { useEffect, useState } from 'react'
import { Search, Phone, Mail } from 'lucide-react'
import axios from 'axios'

export default function AdminPatients() {
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState([])

  const getAllPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patients/get-all", {
        withCredentials: true
      })
      setPatients(response.data.patients)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllPatients()
  }, [])

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase()) ||
    p.disease.toLowerCase().includes(search.toLowerCase())
  )

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 text-sm mt-0.5">{patients.length} patients registered</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or disease..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                <th className="px-6 py-3.5 text-left font-medium">Patient</th>
                <th className="px-6 py-3.5 text-left font-medium">Age</th>
                <th className="px-6 py-3.5 text-left font-medium">Gender</th>
                <th className="px-6 py-3.5 text-left font-medium">Blood Group</th>
                <th className="px-6 py-3.5 text-left font-medium">Disease</th>
                <th className="px-6 py-3.5 text-left font-medium">Contact</th>
                <th className="px-6 py-3.5 text-left font-medium">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <span className="text-emerald-600 font-semibold text-sm">{p.name[0].toUpperCase()}</span>
                      </div>
                      <p className="font-medium text-gray-800">{p.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.age} yrs</td>
                  <td className="px-6 py-4 text-gray-600">{p.gender}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
                      {p.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 capitalize">{p.disease}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-0.5">
                      <p className="flex items-center gap-1.5 text-gray-600"><Phone size={12} />{p.phone}</p>
                      <p className="flex items-center gap-1.5 text-gray-400 text-xs"><Mail size={12} />{p.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{formatDate(p.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No patients found.</div>
          )}
        </div>
        <div className="px-6 py-3 border-t border-gray-100 text-sm text-gray-500">
          Showing {filtered.length} of {patients.length} patients
        </div>
      </div>
    </div>
  )
}
