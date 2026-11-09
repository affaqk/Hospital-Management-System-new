import { Stethoscope, UserRound, CalendarDays, TrendingUp, Clock, CheckCircle, XCircle, ArrowUpRight, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const statusStyle = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Approved:  'bg-blue-100 text-blue-700',
  Pending:   'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
  Rejected:  'bg-red-100 text-red-700',
}

function AppointmentDetailModal({ id, onClose }) {
  const [detail, setDetail] = useState(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/appointments/${id}`, { withCredentials: true })
        setDetail(res.data.appointment)
      } catch (error) {
        console.log(error)
      } finally {
        setFetching(false)
      }
    }
    fetchDetail()
  }, [id])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800 text-base">Appointment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {fetching ? (
            <p className="text-sm text-gray-400 text-center py-6">Loading...</p>
          ) : !detail ? (
            <p className="text-sm text-red-500 text-center py-6">Failed to load appointment.</p>
          ) : (
            <div className="space-y-5">
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-mono">#{detail._id.slice(-8).toUpperCase()}</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[detail.status] || 'bg-gray-100 text-gray-600'}`}>
                  {detail.status}
                </span>
              </div>

              {/* Patient & Doctor */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Patient</p>
                  <p className="font-semibold text-gray-800 text-sm">{detail.patient?.name || '—'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{detail.patient?.email || ''}</p>
                  <p className="text-xs text-gray-500">{detail.patient?.phone || ''}</p>
                  {detail.patient?.age && <p className="text-xs text-gray-500">Age: {detail.patient.age}</p>}
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Doctor</p>
                  <p className="font-semibold text-gray-800 text-sm">{detail.doctor?.name ? `Dr. ${detail.doctor.name}` : '—'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{detail.doctor?.specialisation || ''}</p>
                  <p className="text-xs text-gray-500">{detail.doctor?.email || ''}</p>
                  <p className="text-xs text-gray-500">{detail.doctor?.phone || ''}</p>
                </div>
              </div>

              {/* Date / Time / Department */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Date</p>
                  <p className="text-sm text-gray-700">{new Date(detail.appointmentDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Time</p>
                  <p className="text-sm text-gray-700">{detail.time || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Department</p>
                  <p className="text-sm text-gray-700">{detail.department || '—'}</p>
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="text-xs text-gray-400 mb-0.5">Reason</p>
                <p className="text-sm text-gray-700">{detail.reason}</p>
              </div>

              {/* Notes */}
              {detail.notes && (
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Notes</p>
                  <p className="text-sm text-gray-700">{detail.notes}</p>
                </div>
              )}

              {/* Rejection reason */}
              {detail.rejectionReason && (
                <div>
                  <p className="text-xs text-red-400 mb-0.5">Rejection Reason</p>
                  <p className="text-sm text-red-600">{detail.rejectionReason}</p>
                </div>
              )}

              {/* Fee & Payment */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Consultation Fee</p>
                  <p className="text-sm font-semibold text-gray-800">${detail.consultationFee ?? 0}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Payment</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    detail.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                    detail.paymentStatus === 'Refunded' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {detail.paymentStatus}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AdminOverview() {
  const [appointments, setAppointments] = useState([])
  const [doctorCount, setDoctorCount] = useState(0)
  const [patientCount, setPatientCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [apptRes, doctorRes, patientRes] = await Promise.all([
          axios.get("http://localhost:8000/api/appointments/get-all", { withCredentials: true }),
          axios.get("http://localhost:8000/api/doctors/get-all", { withCredentials: true }),
          axios.get("http://localhost:8000/api/patients/get-all", { withCredentials: true }),
        ])
        setAppointments(apptRes.data.appointments || [])
        setDoctorCount((doctorRes.data.doctors || []).length)
        setPatientCount((patientRes.data.patients || []).length)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date()
  todayEnd.setHours(23, 59, 59, 999)

  const todayCount = appointments.filter(a => {
    const d = new Date(a.appointmentDate)
    return d >= todayStart && d <= todayEnd
  }).length

  const now = new Date()
  const monthlyRevenue = appointments
    .filter(a => {
      const d = new Date(a.appointmentDate)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((sum, a) => sum + (a.consultationFee || 0), 0)

  const completedCount = appointments.filter(a => a.status === 'Completed').length
  const pendingCount = appointments.filter(a => a.status === 'Pending').length
  const cancelledCount = appointments.filter(a => a.status === 'Cancelled').length

  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  const stats = [
    {
      label: 'Total Doctors',
      value: loading ? '—' : doctorCount,
      change: 'Registered doctors',
      icon: Stethoscope,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Total Patients',
      value: loading ? '—' : patientCount,
      change: 'Registered patients',
      icon: UserRound,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: "Today's Appointments",
      value: loading ? '—' : todayCount,
      change: `${pendingCount} pending`,
      icon: CalendarDays,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      label: 'Monthly Revenue',
      value: loading ? '—' : `$${monthlyRevenue.toLocaleString()}`,
      change: 'This month',
      icon: TrendingUp,
      color: 'bg-amber-50 text-amber-600',
    },
  ]

  return (
    <div className="space-y-6">
      {selectedId && (
        <AppointmentDetailModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, Admin. Here's what's happening today.</p>
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

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Recent appointments */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Recent Appointments</h2>
            <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
            ) : recentAppointments.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No appointments found.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <th className="px-6 py-3 text-left font-medium">ID</th>
                    <th className="px-6 py-3 text-left font-medium">Patient</th>
                    <th className="px-6 py-3 text-left font-medium">Doctor</th>
                    <th className="px-6 py-3 text-left font-medium">Time</th>
                    <th className="px-6 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentAppointments.map(a => (
                    <tr
                      key={a._id}
                      onClick={() => setSelectedId(a._id)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-3.5 text-gray-500 font-mono">
                        #{a._id.slice(-5).toUpperCase()}
                      </td>
                      <td className="px-6 py-3.5 font-medium text-gray-800">
                        {a.patient?.name || '—'}
                      </td>
                      <td className="px-6 py-3.5 text-gray-600">
                        {a.doctor?.name ? `Dr. ${a.doctor.name}` : '—'}
                      </td>
                      <td className="px-6 py-3.5 text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} /> {a.time || new Date(a.appointmentDate).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[a.status] || 'bg-gray-100 text-gray-600'}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Appointment Summary</h2>
            <div className="space-y-3">
              {[
                { label: 'Completed', count: completedCount, icon: CheckCircle, color: 'text-emerald-500' },
                { label: 'Pending',   count: pendingCount,   icon: Clock,        color: 'text-yellow-500' },
                { label: 'Cancelled', count: cancelledCount, icon: XCircle,      color: 'text-red-500' },
              ].map(({ label, count, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={color} />
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{loading ? '—' : count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-xl p-5 text-white">
            <h2 className="font-semibold mb-1">New Doctor?</h2>
            <p className="text-blue-100 text-sm mb-4">Register a new doctor and assign them to a department.</p>
            <button className="bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              + Add Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
