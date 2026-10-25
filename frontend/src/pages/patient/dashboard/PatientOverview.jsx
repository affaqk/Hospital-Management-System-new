import { CalendarDays, Clock, Stethoscope, ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react'

const upcomingAppointments = [
  { doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology', date: 'Nov 03, 2026', time: '10:00 AM', type: 'Follow-up' },
]

const recentVisits = [
  { doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology', date: 'Oct 20, 2026', type: 'Follow-up',  status: 'Completed' },
  { doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology', date: 'Sep 15, 2026', type: 'Follow-up',  status: 'Completed' },
  { doctor: 'Dr. Ahmed Khan', specialty: 'Cardiology', date: 'Aug 05, 2026', type: 'New Patient', status: 'Completed' },
]

export default function PatientOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-violet-600 to-violet-800 rounded-2xl p-6 text-white">
        <p className="text-violet-200 text-sm">Welcome back,</p>
        <h1 className="text-2xl font-bold mt-1">Sarah Johnson</h1>
        <p className="text-violet-200 text-sm mt-1">Patient ID: P001 · Blood Type: A+</p>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div>
            <p className="text-violet-300">Next Appointment</p>
            <p className="font-semibold">Nov 03, 2026</p>
          </div>
          <div>
            <p className="text-violet-300">Primary Doctor</p>
            <p className="font-semibold">Dr. Ahmed Khan</p>
          </div>
          <div>
            <p className="text-violet-300">Total Visits</p>
            <p className="font-semibold">8</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Upcoming */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Upcoming Appointment</h2>
              <button className="text-violet-600 text-sm flex items-center gap-1 hover:underline">
                View all <ArrowUpRight size={14} />
              </button>
            </div>
            {upcomingAppointments.length > 0 ? (
              <div className="p-6">
                {upcomingAppointments.map((a, i) => (
                  <div key={i} className="bg-violet-50 border border-violet-100 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-violet-200 rounded-full flex items-center justify-center">
                          <Stethoscope size={20} className="text-violet-700" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{a.doctor}</p>
                          <p className="text-sm text-gray-500">{a.specialty} · {a.type}</p>
                        </div>
                      </div>
                      <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5"><CalendarDays size={14} />{a.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} />{a.time}</span>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium py-2 rounded-lg transition-colors">
                        View Details
                      </button>
                      <button className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium py-2 rounded-lg transition-colors">
                        Reschedule
                      </button>
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
            <div className="divide-y divide-gray-50">
              {recentVisits.map((v, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                  <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle size={16} className="text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{v.doctor}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{v.type} · {v.specialty}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm text-gray-600">{v.date}</p>
                    <span className="text-xs text-emerald-600">{v.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Health Summary</h2>
            <div className="space-y-3">
              {[
                { label: 'Primary Condition', value: 'Hypertension' },
                { label: 'Current Medication', value: 'Lisinopril 10mg' },
                { label: 'Allergies', value: 'Penicillin' },
                { label: 'Last BP Reading', value: '128/82 mmHg' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start text-sm">
                  <span className="text-gray-400">{label}</span>
                  <span className="font-medium text-gray-700 text-right ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Medication Reminder</p>
              <p className="text-xs text-amber-600 mt-1">Take Lisinopril 10mg at 8:00 AM daily with water.</p>
            </div>
          </div>

          <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-xl text-sm transition-colors">
            + Book New Appointment
          </button>
        </div>
      </div>
    </div>
  )
}
