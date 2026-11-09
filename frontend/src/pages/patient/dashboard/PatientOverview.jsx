import { CalendarDays, Clock, Stethoscope, ArrowUpRight, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const statusStyle = {
  Pending:   'bg-yellow-100 text-yellow-700',
  Approved:  'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Cancelled: 'bg-red-100 text-red-700',
  Rejected:  'bg-gray-100 text-gray-600',
}

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'

export default function PatientOverview() {
  const [appointments, setAppointments] = useState([])
  const [patient, setPatient]           = useState(null)
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [apptRes, patientRes] = await Promise.all([
          axios.get('http://localhost:8000/api/appointments/patient',  { withCredentials: true }),
          axios.get('http://localhost:8000/api/patients/profile',      { withCredentials: true }),
        ])
        setAppointments(apptRes.data.appointments || [])
        setPatient(patientRes.data.patient)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const now = new Date()
  const upcoming = appointments
    .filter(a => new Date(a.appointmentDate) >= now && a.status !== 'Cancelled' && a.status !== 'Rejected')
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))

  const recentCompleted = appointments
    .filter(a => a.status === 'Completed')
    .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
    .slice(0, 3)

  const nextAppt      = upcoming[0]
  const primaryDoctor = appointments[0]?.doctor
  const totalVisits   = appointments.filter(a => a.status === 'Completed').length

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl p-6 text-white">
        <p className="text-violet-200 text-sm">Welcome back,</p>
        <h1 className="text-2xl font-bold mt-1">{loading ? '...' : patient?.name || 'Patient'}</h1>
        <p className="text-violet-200 text-sm mt-1">
          {patient ? `Blood Type: ${patient.bloodGroup} · ${patient.disease}` : ''}
        </p>
        <div className="flex items-center gap-6 mt-4 text-sm flex-wrap">
          <div>
            <p className="text-violet-300">Next Appointment</p>
            <p className="font-semibold">{nextAppt ? formatDate(nextAppt.appointmentDate) : 'None scheduled'}</p>
          </div>
          <div>
            <p className="text-violet-300">Primary Doctor</p>
            <p className="font-semibold">
              {primaryDoctor ? `Dr. ${primaryDoctor.name}` : '—'}
            </p>
          </div>
          <div>
            <p className="text-violet-300">Total Visits</p>
            <p className="font-semibold">{loading ? '...' : totalVisits}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <div className="xl:col-span-2 space-y-4">
          {/* Upcoming appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Upcoming Appointments</h2>
              <button className="text-violet-600 text-sm flex items-center gap-1 hover:underline">
                View all <ArrowUpRight size={14} />
              </button>
            </div>
            {loading ? (
              <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
            ) : upcoming.length > 0 ? (
              <div className="p-6 space-y-3">
                {upcoming.slice(0, 2).map(a => (
                  <div key={a._id} className="bg-violet-50 border border-violet-100 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center">
                          <Stethoscope size={20} className="text-violet-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {a.doctor?.name ? `Dr. ${a.doctor.name}` : '—'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {a.doctor?.specialisation || '—'}
                            {a.department ? ` · ${a.department}` : ''}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle[a.status]}`}>
                        {a.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5"><CalendarDays size={14} />{formatDate(a.appointmentDate)}</span>
                      {a.time && <span className="flex items-center gap-1.5"><Clock size={14} />{a.time}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-400">
                <CalendarDays size={36} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No upcoming appointments</p>
                <button className="mt-3 text-violet-600 text-sm font-medium hover:underline">Book Now</button>
              </div>
            )}
          </div>

          {/* Recent visits */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Recent Visits</h2>
            </div>
            {loading ? (
              <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
            ) : recentCompleted.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No completed visits yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentCompleted.map(v => (
                  <div key={v._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                    <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle size={16} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">
                        {v.doctor?.name ? `Dr. ${v.doctor.name}` : '—'}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {v.doctor?.specialisation || '—'}
                        {v.department ? ` · ${v.department}` : ''}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-gray-600">{formatDate(v.appointmentDate)}</p>
                      <span className="text-xs text-emerald-600">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Health Summary</h2>
            {loading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : patient ? (
              <div className="space-y-3">
                {[
                  { label: 'Primary Condition', value: patient.disease },
                  { label: 'Blood Group',        value: patient.bloodGroup },
                  { label: 'Age',                value: `${patient.age} years` },
                  { label: 'Gender',             value: patient.gender },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-start text-sm">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-medium text-gray-700 text-right ml-2 capitalize">{value}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-xl text-sm transition-colors">
            + Book New Appointment
          </button>
        </div>
      </div>
    </div>
  )
}
