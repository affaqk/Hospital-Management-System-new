import { useEffect, useState } from 'react'
import { CalendarDays, Clock, CheckCircle, XCircle, FileText, User, Phone, Stethoscope } from 'lucide-react'
import axios from 'axios'

const statusStyle = {
  Pending:   'bg-yellow-100 text-yellow-700',
  Approved:  'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Rejected:  'bg-red-100 text-red-700',
  Cancelled: 'bg-gray-100 text-gray-600',
}

const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function DoctorAppointmentDetails() {
  const [appointments, setAppointments] = useState([])
  const [selected, setSelected]         = useState(null)
  const [filter, setFilter]             = useState('All')
  const [loading, setLoading]           = useState(true)

  const fetchAllAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/appointments/doctor', {
        withCredentials: true,
      })
      const data = response.data.appointments
      setAppointments(data)
      if (data.length > 0 && !selected) setSelected(data[0])
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const approveAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/approve/${id}`, {}, {
        withCredentials: true,
      })
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'Approved' } : a))
      setSelected(prev => prev?._id === id ? { ...prev, status: 'Approved' } : prev)
    } catch (error) {
      console.log(error)
    }
  }

  const rejectAppointment = async (id) => {
    try {
      await axios.put(`http://localhost:8000/api/appointments/reject/${id}`, {}, {
        withCredentials: true,
      })
      setAppointments(prev => prev.map(a => a._id === id ? { ...a, status: 'Rejected' } : a))
      setSelected(prev => prev?._id === id ? { ...prev, status: 'Rejected' } : prev)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllAppointments()
  }, [])

  const filtered = appointments.filter(a => filter === 'All' || a.status === filter)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        <p className="text-sm">Loading appointments…</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
        <p className="text-gray-500 text-sm mt-0.5">{appointments.length} appointments total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Pending', 'Approved', 'Completed', 'Rejected', 'Cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* List */}
        <div className="xl:col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-10 text-center text-gray-400">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No {filter !== 'All' ? filter.toLowerCase() : ''} appointments</p>
            </div>
          ) : (
            filtered.map(a => (
              <div
                key={a._id}
                onClick={() => setSelected(a)}
                className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selected?._id === a._id ? 'border-emerald-400 shadow-md' : 'border-gray-100'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{a.patient?.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {a.department || 'General'}{a.patient?.age ? ` · Age ${a.patient.age}` : ''}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>
                    {a.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><CalendarDays size={12} />{formatDate(a.appointmentDate)}</span>
                  {a.time && <span className="flex items-center gap-1"><Clock size={12} />{a.time}</span>}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-fit">
          {selected ? (
            <>
              {/* Header */}
              <div className="bg-emerald-700 px-6 py-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-emerald-200 text-xs font-mono mb-1">
                      #{selected._id?.slice(-6).toUpperCase()}
                    </p>
                    <h2 className="text-xl font-bold">{selected.patient?.name}</h2>
                    <p className="text-emerald-200 text-sm mt-1">
                      {selected.department || 'General'}{selected.patient?.age ? ` · Age ${selected.patient.age}` : ''}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 text-white`}>
                    {selected.status}
                  </span>
                </div>
                <div className="flex items-center gap-6 mt-4 text-sm text-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />{formatDate(selected.appointmentDate)}
                  </span>
                  {selected.time && (
                    <span className="flex items-center gap-1.5"><Clock size={14} />{selected.time}</span>
                  )}
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Patient info cards */}
                {(selected.patient?.phone || selected.patient?.disease) && (
                  <div className="grid grid-cols-2 gap-3">
                    {selected.patient?.phone && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                          <Phone size={11} /> Phone
                        </p>
                        <p className="font-medium text-gray-800 text-sm">{selected.patient.phone}</p>
                      </div>
                    )}
                    {selected.patient?.disease && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                          <Stethoscope size={11} /> Condition
                        </p>
                        <p className="font-medium text-gray-800 text-sm">{selected.patient.disease}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reason */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <User size={15} className="text-gray-400" /> Reason for Visit
                  </h3>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">
                    {selected.reason}
                  </p>
                </div>

                {/* Notes */}
                {selected.notes && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FileText size={15} className="text-gray-400" /> Notes
                    </h3>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">
                      {selected.notes}
                    </p>
                  </div>
                )}

                {/* Rejection reason */}
                {selected.status === 'Rejected' && selected.rejectionReason && (
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 mb-2">Rejection Reason</h3>
                    <p className="text-sm text-red-600 bg-red-50 rounded-lg p-4 leading-relaxed">
                      {selected.rejectionReason}
                    </p>
                  </div>
                )}

                {/* Actions — only for Pending */}
                {selected.status === 'Pending' && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => approveAppointment(selected._id)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      onClick={() => rejectAppointment(selected._id)}
                      className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-gray-400">
              <CalendarDays size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select an appointment to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}