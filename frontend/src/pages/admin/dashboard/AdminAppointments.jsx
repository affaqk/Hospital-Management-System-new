import { useState, useEffect } from 'react'
import { Search, CalendarDays, Clock, CheckCircle, XCircle, MoreVertical, Trash2 } from 'lucide-react'
import axios from 'axios'

const statusStyle = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Approved:  'bg-blue-100 text-blue-700',
  Pending:   'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
  Rejected:  'bg-red-100 text-red-700',
}

const statusIcon = {
  Completed: CheckCircle,
  Approved:  CheckCircle,
  Pending:   Clock,
  Cancelled: XCircle,
  Rejected:  XCircle,
}

const ALL_STATUSES = ['Pending', 'Approved', 'Completed', 'Cancelled', 'Rejected']

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [openMenu, setOpenMenu]         = useState(null)

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/appointments/get-all', { withCredentials: true })
      setAppointments(res.data.appointments || [])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/update/${id}`, { status }, { withCredentials: true })
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status } : a))
      setOpenMenu(null)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteAppointment = async (id) => {
    if (!window.confirm('Delete this appointment? This cannot be undone.')) return
    try {
      await axios.delete(`http://localhost:8000/api/appointments/delete/${id}`, { withCredentials: true })
      setAppointments(prev => prev.filter(a => a._id !== id))
      setOpenMenu(null)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => { fetchAppointments() }, [])

  useEffect(() => {
    const close = () => setOpenMenu(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  const filtered = appointments.filter(a => {
    const matchSearch = (a.patient?.name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (a.doctor?.name  || '').toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = {
    All: appointments.length,
    ...ALL_STATUSES.reduce((acc, s) => ({ ...acc, [s]: appointments.filter(a => a.status === s).length }), {}),
  }

  const formatDate = (iso) =>
    iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        <p className="text-gray-500 text-sm mt-0.5">{appointments.length} appointments total</p>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status} <span className={`ml-1 ${statusFilter === status ? 'text-blue-200' : 'text-gray-400'}`}>({count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-10">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                  <th className="px-6 py-3.5 text-left font-medium">ID</th>
                  <th className="px-6 py-3.5 text-left font-medium">Patient</th>
                  <th className="px-6 py-3.5 text-left font-medium">Doctor</th>
                  <th className="px-6 py-3.5 text-left font-medium">Date & Time</th>
                  <th className="px-6 py-3.5 text-left font-medium">Department</th>
                  <th className="px-6 py-3.5 text-left font-medium">Status</th>
                  <th className="px-6 py-3.5 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(a => {
                  const Icon = statusIcon[a.status] || Clock
                  return (
                    <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                        #{a._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {a.patient?.name || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{a.doctor?.name ? `Dr. ${a.doctor.name}` : '—'}</p>
                        <p className="text-gray-400 text-xs">{a.doctor?.specialisation || ''}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700 flex items-center gap-1">
                          <CalendarDays size={12} />{formatDate(a.appointmentDate)}
                        </p>
                        {a.time && (
                          <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5">
                            <Clock size={12} />{a.time}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{a.department || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[a.status] || 'bg-gray-100 text-gray-600'}`}>
                          <Icon size={11} /> {a.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 relative">
                        <button
                          onClick={e => { e.stopPropagation(); setOpenMenu(openMenu === a._id ? null : a._id) }}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {openMenu === a._id && (
                          <div
                            onClick={e => e.stopPropagation()}
                            className="absolute right-6 top-full mt-1 z-10 bg-white border border-gray-100 rounded-lg shadow-lg py-1 min-w-[150px]"
                          >
                            <p className="px-4 py-1.5 text-xs text-gray-400 font-medium uppercase">Set Status</p>
                            {ALL_STATUSES.filter(s => s !== a.status).map(s => (
                              <button
                                key={s}
                                onClick={() => updateStatus(a._id, s)}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                {s}
                              </button>
                            ))}
                            <div className="border-t border-gray-100 mt-1 pt-1">
                              <button
                                onClick={() => deleteAppointment(a._id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 size={13} /> Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No appointments found.</div>
          )}
        </div>
        <div className="px-6 py-3 border-t border-gray-100 text-sm text-gray-500">
          Showing {filtered.length} of {appointments.length} appointments
        </div>
      </div>
    </div>
  )
}
