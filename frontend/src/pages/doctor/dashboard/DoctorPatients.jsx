import { useState, useEffect } from 'react'
import { Search, ChevronRight, HeartPulse, CalendarDays } from 'lucide-react'
import axios from 'axios'

const statusStyle = {
  Pending:   'bg-yellow-100 text-yellow-700',
  Approved:  'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Rejected:  'bg-red-100 text-red-700',
  Cancelled: 'bg-gray-100 text-gray-600',
}

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

export default function DoctorPatients() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [selected, setSelected]         = useState(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/appointments/doctor', { withCredentials: true })
        setAppointments(res.data.appointments || [])
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAppointments()
  }, [])

  // Derive unique patients from appointments
  const patientsMap = {}
  appointments.forEach(a => {
    if (!a.patient?._id) return
    const id = a.patient._id
    if (!patientsMap[id]) patientsMap[id] = { ...a.patient, appointmentList: [] }
    patientsMap[id].appointmentList.push(a)
  })
  const patients = Object.values(patientsMap)

  const filtered = patients.filter(p =>
    (p.name    || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.disease || '').toLowerCase().includes(search.toLowerCase())
  )

  const selectedAppointments = selected
    ? appointments
        .filter(a => a.patient?._id === selected._id)
        .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
    : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {loading ? '...' : `${patients.length} patients under your care`}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Patient list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients or condition..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse">
                  <div className="flex gap-4">
                    <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400">
              <HeartPulse size={36} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No patients found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(p => (
                <div
                  key={p._id}
                  onClick={() => setSelected(p)}
                  className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                    selected?._id === p._id ? 'border-emerald-400 shadow-md' : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <span className="text-emerald-700 font-semibold">{p.name?.[0] || '?'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <span className="text-xs text-gray-400">
                          {p.appointmentList.length} visit{p.appointmentList.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 capitalize">
                        {p.disease || '—'}
                        {p.age   ? ` · Age ${p.age}`   : ''}
                        {p.phone ? ` · ${p.phone}` : ''}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Patient detail panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-fit">
          {selected ? (
            <>
              <div className="bg-emerald-700 p-6 text-white">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold">{selected.name?.[0] || '?'}</span>
                </div>
                <p className="text-center font-semibold mt-2">{selected.name}</p>
                <p className="text-center text-emerald-200 text-sm capitalize">{selected.disease || '—'}</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Age',          selected.age   ? `${selected.age} yrs` : '—'],
                    ['Phone',        selected.phone || '—'],
                    ['Total Visits', selected.appointmentList.length],
                    ['Email',        selected.email || '—'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-gray-400 text-xs">{k}</p>
                      <p className="font-medium text-gray-800 mt-0.5 text-sm truncate">{v}</p>
                    </div>
                  ))}
                </div>

                {selected.disease && (
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs text-gray-400 mb-1">Primary Condition</p>
                    <div className="flex items-center gap-2">
                      <HeartPulse size={16} className="text-red-500" />
                      <p className="font-medium text-gray-800 capitalize">{selected.disease}</p>
                    </div>
                  </div>
                )}

                {/* Appointment history */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Appointment History</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedAppointments.map(a => (
                      <div key={a._id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                        <span className="flex items-center gap-1.5 text-gray-600">
                          <CalendarDays size={11} className="text-gray-400" />
                          {formatDate(a.appointmentDate)}
                          {a.time && <span className="text-gray-400">{a.time}</span>}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${statusStyle[a.status] || 'bg-gray-100 text-gray-600'}`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <HeartPulse size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a patient to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
