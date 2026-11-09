import { UserRound, CalendarDays, CheckCircle, Clock, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function DoctorOverview() {
  const [appointments, setAppointments] = useState([])
  const [doctor, setDoctor]             = useState(null)
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [apptRes, docRes] = await Promise.all([
          axios.get('http://localhost:8000/api/appointments/doctor', { withCredentials: true }),
          axios.get('http://localhost:8000/api/doctors/profile',     { withCredentials: true }),
        ])
        setAppointments(apptRes.data.appointments || [])
        setDoctor(docRes.data.doctor)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
  const todayEnd   = new Date(); todayEnd.setHours(23, 59, 59, 999)

  const todayAppts = appointments.filter(a => {
    const d = new Date(a.appointmentDate)
    return d >= todayStart && d <= todayEnd
  })

  const completedToday = todayAppts.filter(a => a.status === 'Completed').length
  const pendingCount   = appointments.filter(a => a.status === 'Pending').length
  const uniquePatients = new Set(appointments.map(a => a.patient?._id).filter(Boolean)).size

  const stats = [
    { label: 'Total Patients',       value: loading ? '—' : uniquePatients,    change: 'Under your care',     icon: UserRound,    color: 'bg-emerald-50 text-emerald-600' },
    { label: "Today's Appointments", value: loading ? '—' : todayAppts.length, change: `${completedToday} completed`, icon: CalendarDays, color: 'bg-blue-50 text-blue-600' },
    { label: 'Completed Today',      value: loading ? '—' : completedToday,    change: 'Finished today',      icon: CheckCircle,  color: 'bg-violet-50 text-violet-600' },
    { label: 'Pending Approval',     value: loading ? '—' : pendingCount,      change: 'Needs your action',   icon: Clock,        color: 'bg-amber-50 text-amber-600' },
  ]

  const todaySchedule = [...todayAppts].sort((a, b) => (a.time || '').localeCompare(b.time || ''))
  const nextPatient   = todayAppts.find(a => a.status !== 'Completed' && a.status !== 'Cancelled' && a.status !== 'Rejected')

  const getScheduleStyle = (status) => {
    if (status === 'Completed') return 'bg-emerald-100 text-emerald-700'
    if (status === 'Approved')  return 'bg-blue-100 text-blue-700'
    if (status === 'Pending')   return 'bg-yellow-100 text-yellow-700'
    return 'bg-gray-100 text-gray-600'
  }

  const getScheduleLabel = (status) => {
    if (status === 'Completed') return 'Done'
    if (status === 'Approved')  return 'Upcoming'
    return status
  }

  const formatFullDate = (d) =>
    d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {doctor ? `Good morning, Dr. ${doctor.name.split(' ')[0]}` : 'Dashboard'}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's your schedule for today — {formatFullDate(new Date())}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                <p className="text-xs text-gray-400 mt-1">{change}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center`}>
                <Icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Today's schedule */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Today's Schedule</h2>
            <button className="text-emerald-600 text-sm flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          {loading ? (
            <p className="text-sm text-gray-400 text-center py-10">Loading...</p>
          ) : todaySchedule.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <CalendarDays size={36} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No appointments scheduled for today</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {todaySchedule.map(a => (
                <div key={a._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                  <div className="w-20 shrink-0">
                    <p className="text-sm font-medium text-gray-700">{a.time || '—'}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{a.patient?.name || '—'}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{a.department || 'General'}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${getScheduleStyle(a.status)}`}>
                    {getScheduleLabel(a.status)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Next Patient</h2>
            {loading ? (
              <p className="text-sm text-gray-400">Loading...</p>
            ) : nextPatient ? (
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="font-semibold text-gray-800">{nextPatient.patient?.name || '—'}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                  {nextPatient.department || 'General'}{nextPatient.time ? ` · ${nextPatient.time}` : ''}
                </p>
                <div className="mt-3 space-y-1 text-sm text-gray-600">
                  {nextPatient.patient?.age     && <p>Age: {nextPatient.patient.age}</p>}
                  {nextPatient.patient?.disease && <p>Condition: {nextPatient.patient.disease}</p>}
                  {nextPatient.reason && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{nextPatient.reason}</p>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">No upcoming patients today</p>
            )}
          </div>

          <div className="bg-emerald-700 rounded-xl p-5 text-white">
            <h2 className="font-semibold mb-1">Pending Approvals</h2>
            <p className="text-emerald-200 text-sm mb-4">
              {loading
                ? '...'
                : pendingCount > 0
                  ? `${pendingCount} appointment${pendingCount > 1 ? 's' : ''} waiting for your approval.`
                  : 'No pending appointments.'}
            </p>
            <button className="bg-white text-emerald-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
              Review Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
