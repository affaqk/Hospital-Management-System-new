import { useState } from 'react'
import { CalendarDays, Clock, CheckCircle, XCircle, FileText, HeartPulse } from 'lucide-react'

const appointments = [
  {
    id: '#A1043', patient: 'Mark Williams',  age: 52, date: 'Oct 24, 2026', time: '10:30 AM',
    type: 'Consultation', status: 'Completed', notes: 'Patient reports palpitations. ECG ordered. Follow up in 2 weeks.',
    vitals: { bp: '145/90', hr: '88 bpm', temp: '98.6°F', spo2: '97%' },
  },
  {
    id: '#A1044', patient: 'Emily Davis',    age: 28, date: 'Oct 24, 2026', time: '11:30 AM',
    type: 'New Patient',  status: 'Completed', notes: 'First visit. Presenting with chest tightness. Stress test scheduled.',
    vitals: { bp: '120/80', hr: '72 bpm', temp: '98.4°F', spo2: '99%' },
  },
  {
    id: '#A1046', patient: 'Linda Martinez', age: 41, date: 'Oct 25, 2026', time: '02:00 PM',
    type: 'Follow-up',    status: 'Upcoming', notes: '',
    vitals: null,
  },
  {
    id: '#A1047', patient: 'Robert Brown',   age: 67, date: 'Oct 30, 2026', time: '09:00 AM',
    type: 'Follow-up',    status: 'Upcoming', notes: '',
    vitals: null,
  },
  {
    id: '#A1038', patient: 'Sarah Johnson',  age: 34, date: 'Oct 20, 2026', time: '09:00 AM',
    type: 'Follow-up',    status: 'Completed', notes: 'BP well controlled on current medication. Continue Lisinopril 10mg.',
    vitals: { bp: '128/82', hr: '68 bpm', temp: '98.2°F', spo2: '98%' },
  },
]

const statusStyle = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Upcoming:  'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export default function DoctorAppointmentDetails() {
  const [selected, setSelected] = useState(appointments[0])
  const [filter, setFilter]     = useState('All')

  const filtered = appointments.filter(a => filter === 'All' || a.status === filter)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Appointment Details</h1>
        <p className="text-gray-500 text-sm mt-0.5">{appointments.length} appointments total</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {['All', 'Upcoming', 'Completed', 'Cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        {/* List */}
        <div className="xl:col-span-2 space-y-3">
          {filtered.map(a => (
            <div
              key={a.id}
              onClick={() => setSelected(a)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                selected?.id === a.id ? 'border-emerald-400 shadow-md' : 'border-gray-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{a.patient}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.type} · Age {a.age}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>
                  {a.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><CalendarDays size={12} />{a.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{a.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="xl:col-span-3 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-fit">
          {selected ? (
            <>
              <div className="bg-emerald-700 px-6 py-5 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-emerald-200 text-xs font-mono mb-1">{selected.id}</p>
                    <h2 className="text-xl font-bold">{selected.patient}</h2>
                    <p className="text-emerald-200 text-sm mt-1">{selected.type} · Age {selected.age}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    selected.status === 'Completed' ? 'bg-white/20 text-white' : 'bg-blue-400/30 text-white'
                  }`}>
                    {selected.status}
                  </span>
                </div>
                <div className="flex items-center gap-6 mt-4 text-sm text-emerald-200">
                  <span className="flex items-center gap-1.5"><CalendarDays size={14} />{selected.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} />{selected.time}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Vitals */}
                {selected.vitals ? (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <HeartPulse size={16} className="text-red-500" /> Vitals
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {Object.entries(selected.vitals).map(([k, v]) => (
                        <div key={k} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-400 uppercase">{k}</p>
                          <p className="font-semibold text-gray-800 mt-1">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-600 flex items-center gap-2">
                    <CalendarDays size={15} />
                    Appointment is upcoming — vitals not yet recorded.
                  </div>
                )}

                {/* Notes */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText size={16} className="text-gray-400" /> Clinical Notes
                  </h3>
                  {selected.notes ? (
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 leading-relaxed">
                      {selected.notes}
                    </p>
                  ) : (
                    <textarea
                      className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-600 resize-none"
                      rows={3}
                      placeholder="Add clinical notes after the appointment..."
                    />
                  )}
                </div>

                {/* Actions */}
                {selected.status === 'Upcoming' && (
                  <div className="flex gap-3 pt-2">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <CheckCircle size={16} /> Mark Complete
                    </button>
                    <button className="flex-1 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <XCircle size={16} /> Cancel
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

