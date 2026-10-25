import { UserRound, CalendarDays, CheckCircle, Clock, ArrowUpRight } from 'lucide-react'

const stats = [
  { label: 'Total Patients',       value: '142', change: '+5 this month',     icon: UserRound,    color: 'bg-emerald-50 text-emerald-600' },
  { label: "Today's Appointments", value: '8',   change: '2 remaining',       icon: CalendarDays, color: 'bg-blue-50 text-blue-600' },
  { label: 'Completed Today',      value: '6',   change: 'on track',          icon: CheckCircle,  color: 'bg-violet-50 text-violet-600' },
  { label: 'Pending Review',       value: '3',   change: 'reports due',       icon: Clock,        color: 'bg-amber-50 text-amber-600' },
]

const todaySchedule = [
  { time: '09:00 AM', patient: 'Sarah Johnson',  type: 'Follow-up',    status: 'Done' },
  { time: '10:30 AM', patient: 'Mark Williams',  type: 'Consultation', status: 'Done' },
  { time: '11:30 AM', patient: 'Emily Davis',    type: 'New Patient',  status: 'In Progress' },
  { time: '01:00 PM', patient: 'Robert Brown',   type: 'Follow-up',    status: 'Upcoming' },
  { time: '02:30 PM', patient: 'Linda Martinez', type: 'Routine',      status: 'Upcoming' },
]

const statusStyle = {
  'Done':        'bg-emerald-100 text-emerald-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  'Upcoming':    'bg-gray-100 text-gray-600',
}

export default function DoctorOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning, Dr. Khan</h1>
        <p className="text-gray-500 text-sm mt-1">Here's your schedule for today — Oct 24, 2026.</p>
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
          <div className="divide-y divide-gray-50">
            {todaySchedule.map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="w-20 shrink-0">
                  <p className="text-sm font-medium text-gray-700">{s.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800">{s.patient}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.type}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${statusStyle[s.status]}`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick info */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Next Patient</h2>
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="font-semibold text-gray-800">Emily Davis</p>
              <p className="text-sm text-gray-500 mt-0.5">New Patient · 11:30 AM</p>
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>Age: 28</p>
                <p>Concern: Chest pain</p>
                <p>Insurance: BlueCross</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-700 rounded-xl p-5 text-white">
            <h2 className="font-semibold mb-1">Pending Reports</h2>
            <p className="text-emerald-200 text-sm mb-4">3 patient reports need your review and sign-off.</p>
            <button className="bg-white text-emerald-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors">
              Review Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
