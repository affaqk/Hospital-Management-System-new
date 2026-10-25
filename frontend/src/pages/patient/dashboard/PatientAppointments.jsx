import { useState } from 'react'
import { CalendarDays, Clock, CheckCircle, XCircle, ChevronDown, FileText, Star } from 'lucide-react'

const appointments = [
  {
    id: '#A1042', doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology',
    date: 'Oct 20, 2026', time: '09:00 AM', type: 'Follow-up',
    status: 'Completed', notes: 'BP controlled. Continue current medication. Next visit in 6 weeks.',
  },
  {
    id: '#A1031', doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology',
    date: 'Sep 15, 2026', time: '10:00 AM', type: 'Follow-up',
    status: 'Completed', notes: 'Mild hypertension. Dosage adjusted. Reduce salt intake.',
  },
  {
    id: '#A1018', doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology',
    date: 'Aug 05, 2026', time: '11:30 AM', type: 'New Patient',
    status: 'Completed', notes: 'Initial consultation. Diagnosed with Stage 1 Hypertension.',
  },
  {
    id: '#A1050', doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology',
    date: 'Nov 03, 2026', time: '10:00 AM', type: 'Follow-up',
    status: 'Upcoming', notes: '',
  },
  {
    id: '#A1025', doctor: 'Dr. John Lee', specialty: 'Orthopedics',
    date: 'Jul 12, 2026', time: '03:00 PM', type: 'Consultation',
    status: 'Cancelled', notes: 'Patient cancelled due to scheduling conflict.',
  },
]

const statusStyle = {
  Completed: { badge: 'bg-emerald-100 text-emerald-700', icon: CheckCircle },
  Upcoming:  { badge: 'bg-blue-100 text-blue-700',    icon: Clock },
  Cancelled: { badge: 'bg-red-100 text-red-700',      icon: XCircle },
}

export default function PatientAppointments() {
  const [filter, setFilter]     = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = appointments.filter(a => filter === 'All' || a.status === filter)

  const counts = {
    All:       appointments.length,
    Upcoming:  appointments.filter(a => a.status === 'Upcoming').length,
    Completed: appointments.filter(a => a.status === 'Completed').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">Your complete appointment history</p>
        </div>
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <CalendarDays size={18} /> Book Appointment
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === status
                ? 'bg-violet-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status} <span className={`ml-1 ${filter === status ? 'text-violet-200' : 'text-gray-400'}`}>({count})</span>
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {filtered.map(a => {
          const { badge, icon: Icon } = statusStyle[a.status]
          const isOpen = expanded === a.id

          return (
            <div key={a.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : a.id)}
                className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-violet-700 font-semibold text-sm">{a.doctor.split(' ')[1][0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-800">{a.doctor}</p>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${badge}`}>
                      <Icon size={11} /> {a.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{a.specialty} · {a.type}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><CalendarDays size={11} />{a.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} />{a.time}</span>
                    <span className="font-mono">{a.id}</span>
                  </div>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                  {a.notes ? (
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-medium mb-2 flex items-center gap-1.5">
                        <FileText size={12} /> Doctor's Notes
                      </p>
                      <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">{a.notes}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No notes for this appointment.</p>
                  )}

                  {a.status === 'Completed' && (
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-medium mb-2 flex items-center gap-1.5">
                        <Star size={12} /> Rate this visit
                      </p>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(n => (
                          <button key={n} className="text-gray-300 hover:text-amber-400 transition-colors">
                            <Star size={22} />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {a.status === 'Upcoming' && (
                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm rounded-lg transition-colors">
                        Reschedule
                      </button>
                      <button className="px-4 py-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm rounded-lg transition-colors">
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
    </div>
  )
}
