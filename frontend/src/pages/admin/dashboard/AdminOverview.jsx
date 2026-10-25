import { Stethoscope, UserRound, CalendarDays, TrendingUp, Clock, CheckCircle, XCircle, ArrowUpRight } from 'lucide-react'

const stats = [
  { label: 'Total Doctors',    value: '48',   change: '+3 this month',  icon: Stethoscope, color: 'bg-blue-50 text-blue-600' },
  { label: 'Total Patients',   value: '1,284', change: '+21 this week', icon: UserRound,   color: 'bg-emerald-50 text-emerald-600' },
  { label: 'Today\'s Appointments', value: '36', change: '8 pending',  icon: CalendarDays, color: 'bg-violet-50 text-violet-600' },
  { label: 'Monthly Revenue',  value: '$84,200', change: '+12% vs last month', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
]

const recentAppointments = [
  { id: '#A1042', patient: 'Sarah Johnson',  doctor: 'Dr. Ahmed Khan',   time: '09:00 AM', status: 'Completed' },
  { id: '#A1043', patient: 'Mark Williams',  doctor: 'Dr. Priya Sharma', time: '10:30 AM', status: 'Ongoing' },
  { id: '#A1044', patient: 'Emily Davis',    doctor: 'Dr. John Lee',     time: '11:00 AM', status: 'Pending' },
  { id: '#A1045', patient: 'Robert Brown',   doctor: 'Dr. Ahmed Khan',   time: '12:00 PM', status: 'Cancelled' },
  { id: '#A1046', patient: 'Linda Martinez', doctor: 'Dr. Priya Sharma', time: '02:00 PM', status: 'Pending' },
]

const statusStyle = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Ongoing:   'bg-blue-100 text-blue-700',
  Pending:   'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
}

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Page header */}
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
            <h2 className="font-semibold text-gray-800">Today's Appointments</h2>
            <button className="text-blue-600 text-sm flex items-center gap-1 hover:underline">
              View all <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
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
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5 text-gray-500 font-mono">{a.id}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-800">{a.patient}</td>
                    <td className="px-6 py-3.5 text-gray-600">{a.doctor}</td>
                    <td className="px-6 py-3.5 text-gray-500 flex items-center gap-1.5">
                      <Clock size={13} /> {a.time}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-800 mb-4">Appointment Summary</h2>
            <div className="space-y-3">
              {[
                { label: 'Completed', count: 18, icon: CheckCircle, color: 'text-emerald-500' },
                { label: 'Pending',   count: 10, icon: Clock,        color: 'text-yellow-500' },
                { label: 'Cancelled', count: 4,  icon: XCircle,      color: 'text-red-500' },
              ].map(({ label, count, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className={color} />
                    <span className="text-sm text-gray-600">{label}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{count}</span>
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
