import { useEffect, useState } from 'react'
import { Search, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import axios from "axios"

export default function AdminDoctors() {
  const [search, setSearch] = useState('')
  const [doctors, setDoctors] = useState([])
  const [openMenu, setOpenMenu] = useState(null)

  const getAllDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/doctors/get-all", {
        withCredentials: true
      })
      setDoctors(response.data.doctors)
    } catch (error) {
      console.log(error)
    }
  }

  const approveDoctor = async (doctorId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/admin/approve-doctor/${doctorId}`,
        {},
        { withCredentials: true }
      )
      console.log(response)
      setOpenMenu(null)
      getAllDoctors()
    } catch (error) {
      console.log(error)
    }
  }

  const rejectDoctor = async (doctorId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/admin/reject-doctor/${doctorId}`,
        {},
        { withCredentials: true }
      )
      console.log(response)
      setOpenMenu(null)
      getAllDoctors()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllDoctors()
  }, [])

  useEffect(() => {
    const close = () => setOpenMenu(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialisation.toLowerCase().includes(search.toLowerCase())
  )

  const getInitials = (name) => {
    const parts = name.trim().split(' ')
    return parts.length > 1 ? parts[1][0].toUpperCase() : parts[0][0].toUpperCase()
  }

  const getStatusStyle = (status) => {
    if (status === 'Approved') return 'bg-emerald-100 text-emerald-700'
    if (status === 'Rejected') return 'bg-red-100 text-red-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-500 text-sm mt-0.5">{doctors.length} doctors registered</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialisation..."
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
                <th className="px-6 py-3.5 text-left font-medium">Doctor</th>
                <th className="px-6 py-3.5 text-left font-medium">Specialisation</th>
                <th className="px-6 py-3.5 text-left font-medium">Experience</th>
                <th className="px-6 py-3.5 text-left font-medium">Phone</th>
                <th className="px-6 py-3.5 text-left font-medium">Gender</th>
                <th className="px-6 py-3.5 text-left font-medium">Status</th>
                <th className="px-6 py-3.5 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(d => (
                <tr key={d._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-semibold text-sm">
                          {getInitials(d.name)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{d.name}</p>
                        <p className="text-gray-400 text-xs">{d.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{d.specialisation}</td>
                  <td className="px-6 py-4 text-gray-700">{d.experience} yrs</td>
                  <td className="px-6 py-4 text-gray-600">{d.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{d.gender}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(d.status)}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button
                      onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === d._id ? null : d._id) }}
                      className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {openMenu === d._id && (
                      <div
                        onClick={e => e.stopPropagation()}
                        className="absolute right-6 top-full mt-1 z-10 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[130px]"
                      >
                        <button
                          onClick={() => approveDoctor(d._id)}
                          className="w-full text-left px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button
                          onClick={() => rejectDoctor(d._id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No doctors found.</div>
          )}
        </div>
        <div className="px-6 py-3 border-t border-gray-100 text-sm text-gray-500">
          Showing {filtered.length} of {doctors.length} doctors
        </div>
      </div>
    </div>
  )
}
