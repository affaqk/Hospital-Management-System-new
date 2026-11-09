import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CalendarDays, Clock, CheckCircle, XCircle, ChevronDown,
  FileText, Plus, X, Send, AlertCircle
} from 'lucide-react'

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

const DEPARTMENTS = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Emergency Care', 'Diagnostics', 'Gynecology', 'Pulmonology',
  'Dermatology', 'General Medicine',
]

const statusStyle = {
  Pending:   { badge: 'bg-yellow-100 text-yellow-700', icon: Clock },
  Approved:  { badge: 'bg-blue-100 text-blue-700',    icon: Clock },
  Completed: { badge: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  Cancelled: { badge: 'bg-red-100 text-red-700',      icon: XCircle },
  Rejected:  { badge: 'bg-gray-100 text-gray-600',    icon: XCircle },
}

const inputClass = "w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors]           = useState([])
  const [loading, setLoading]           = useState(true)
  const [filter, setFilter]             = useState('All')
  const [expanded, setExpanded]         = useState(null)
  const [showModal, setShowModal]       = useState(false)
  const [submitting, setSubmitting]     = useState(false)
  const [error, setError]               = useState('')
  const [success, setSuccess]           = useState('')

  const [form, setForm] = useState({
    doctor: '', department: '', date: '', time: '', reason: '', notes: '',
  })

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/appointments/patient', {
        withCredentials: true,
      })
      setAppointments(res.data.appointments)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/doctors/get-all', {
        withCredentials: true,
      })
      setDoctors(res.data.doctors.filter(d => d.status === 'Approved'))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchAppointments()
    fetchDoctors()
  }, [])

  const handleBook = async (e) => {
    e.preventDefault()
    if (!form.time) { setError('Please select a time slot.'); return }
    setError('')
    setSubmitting(true)
    try {
      await axios.post('http://localhost:8000/api/appointments/book', {
        doctor: form.doctor,
        appointmentDate: form.date,
        time: form.time,
        department: form.department,
        reason: form.reason,
        notes: form.notes,
      }, { withCredentials: true })
      setSuccess('Appointment booked successfully!')
      setForm({ doctor: '', department: '', date: '', time: '', reason: '', notes: '' })
      setShowModal(false)
      fetchAppointments()
      setTimeout(() => setSuccess(''), 4000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return
    try {
      await axios.put(`http://localhost:8000/api/appointments/cancel/${id}`, {}, {
        withCredentials: true,
      })
      fetchAppointments()
    } catch (err) {
      console.log(err)
    }
  }

  const openModal = () => {
    setError('')
    setShowModal(true)
  }

  const allStatuses = ['All', 'Pending', 'Approved', 'Completed', 'Cancelled', 'Rejected']
  const filtered = filter === 'All' ? appointments : appointments.filter(a => a.status === filter)

  const counts = allStatuses.reduce((acc, s) => {
    acc[s] = s === 'All' ? appointments.length : appointments.filter(a => a.status === s).length
    return acc
  }, {})

  const visibleFilters = allStatuses.filter(s => s === 'All' || counts[s] > 0)

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">Your complete appointment history</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={18} /> Book Appointment
        </button>
      </div>

      {/* Success banner */}
      {success && (
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {visibleFilters.map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-violet-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status} <span className={`ml-1 ${filter === status ? 'text-violet-200' : 'text-gray-400'}`}>({counts[status]})</span>
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 animate-pulse">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <CalendarDays size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500 text-sm">
            {filter === 'All' ? 'No appointments yet. Book your first one!' : `No ${filter.toLowerCase()} appointments.`}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(a => {
            const style = statusStyle[a.status] || statusStyle.Pending
            const Icon = style.icon
            const isOpen = expanded === a._id

            return (
              <div key={a._id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpanded(isOpen ? null : a._id)}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-violet-700 font-semibold text-sm">
                      {a.doctor?.name ? a.doctor.name.split(' ').pop()[0] : 'D'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{a.doctor?.name || 'Doctor'}</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${style.badge}`}>
                        <Icon size={11} /> {a.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {a.doctor?.specialisation || '—'}{a.department ? ` · ${a.department}` : ''}
                    </p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><CalendarDays size={11} />{formatDate(a.appointmentDate)}</span>
                      {a.time && <span className="flex items-center gap-1"><Clock size={11} />{a.time}</span>}
                      <span className="font-mono">{a._id.slice(-6).toUpperCase()}</span>
                    </div>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-medium mb-1.5 flex items-center gap-1.5">
                        <FileText size={12} /> Reason
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">{a.reason}</p>
                    </div>
                    {a.notes && (
                      <div>
                        <p className="text-xs text-gray-400 uppercase font-medium mb-1.5">Notes</p>
                        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-3">{a.notes}</p>
                      </div>
                    )}
                    {(a.status === 'Pending' || a.status === 'Approved') && (
                      <div className="pt-1">
                        <button
                          onClick={() => handleCancel(a._id)}
                          className="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm rounded-lg transition-colors"
                        >
                          Cancel Appointment
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 my-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Book an Appointment</h3>
                <p className="text-gray-400 text-sm mt-0.5">Fill in the details to request an appointment</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                <AlertCircle size={15} /> {error}
              </div>
            )}

            <form onSubmit={handleBook} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Department</label>
                  <select value={form.department} onChange={set('department')} className={inputClass}>
                    <option value="">Select department</option>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Select Doctor *</label>
                  <select value={form.doctor} onChange={set('doctor')} required className={inputClass}>
                    <option value="">Choose a doctor</option>
                    {doctors.map(d => (
                      <option key={d._id} value={d._id}>
                        Dr. {d.name} — {d.specialisation}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Preferred Date *</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={set('date')}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Time slots */}
              <div>
                <label className={labelClass}>Preferred Time *</label>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, time: slot }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                        form.time === slot
                          ? 'bg-violet-600 text-white border-violet-600'
                          : 'border-gray-200 text-gray-600 hover:border-violet-300 hover:text-violet-600'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Reason for Visit *</label>
                <textarea
                  rows={2}
                  value={form.reason}
                  onChange={set('reason')}
                  required
                  placeholder="e.g. Regular check-up, persistent headache, chest pain..."
                  className={inputClass + ' resize-none'}
                />
              </div>

              <div>
                <label className={labelClass}>Additional Notes</label>
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={set('notes')}
                  placeholder="Any additional information or symptoms..."
                  className={inputClass + ' resize-none'}
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
                >
                  <Send size={14} /> {submitting ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
