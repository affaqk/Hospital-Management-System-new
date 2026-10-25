import { useState } from 'react'
import { Search, CalendarDays, Clock, CheckCircle, XCircle, MoreVertical, Filter } from 'lucide-react'

const appointments = [
  { id: '#A1042', patient: 'Sarah Johnson',  doctor: 'Dr. Ahmed Khan',   specialty: 'Cardiology',      date: 'Oct 24, 2026', time: '09:00 AM', type: 'Follow-up',    status: 'Completed' },
  { id: '#A1043', patient: 'Mark Williams',  doctor: 'Dr. Priya Sharma', specialty: 'Neurology',       date: 'Oct 24, 2026', time: '10:30 AM', type: 'Consultation', status: 'Ongoing' },
  { id: '#A1044', patient: 'Emily Davis',    doctor: 'Dr. John Lee',     specialty: 'Orthopedics',     date: 'Oct 24, 2026', time: '11:00 AM', type: 'New Patient',  status: 'Pending' },
  { id: '#A1045', patient: 'Robert Brown',   doctor: 'Dr. Ahmed Khan',   specialty: 'Cardiology',      date: 'Oct 24, 2026', time: '12:00 PM', type: 'Follow-up',    status: 'Cancelled' },
  { id: '#A1046', patient: 'Linda Martinez', doctor: 'Dr. Maria Torres', specialty: 'Pediatrics',      date: 'Oct 25, 2026', time: '02:00 PM', type: 'Routine',      status: 'Pending' },
  { id: '#A1047', patient: 'David Wilson',   doctor: 'Dr. Fatima Ali',   specialty: 'General Practice',date: 'Oct 25, 2026', time: '03:30 PM', type: 'Consultation', status: 'Pending' },
  { id: '#A1048', patient: 'Amy Clark',      doctor: 'Dr. James Patel',  specialty: 'Dermatology',     date: 'Oct 26, 2026', time: '09:30 AM', type: 'New Patient',  status: 'Pending' },
]

const statusStyle = {
  Completed: 'bg-emerald-100 text-emerald-700',
  Ongoing:   'bg-blue-100 text-blue-700',
  Pending:   'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
}

const statusIcon = {
  Completed: CheckCircle,
  Ongoing:   Clock,
  Pending:   Clock,
  Cancelled: XCircle,
}

export default function AdminAppointments() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered = appointments.filter(a => {
    const matchSearch = a.patient.toLowerCase().includes(search.toLowerCase()) ||
                        a.doctor.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'All' || a.status === statusFilter
    return matchSearch && matchStatus
  })

  const counts = {
    All:       appointments.length,
    Pending:   appointments.filter(a => a.status === 'Pending').length,
    Ongoing:   appointments.filter(a => a.status === 'Ongoing').length,
    Completed: appointments.filter(a => a.status === 'Completed').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-500 text-sm mt-0.5">{appointments.length} appointments total</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <CalendarDays size={18} /> New Appointment
        </button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(counts).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === status
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {status} <span className={`ml-1 ${statusFilter === status ? 'text-blue-200' : 'text-gray-400'}`}>({count})</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <input
          type="date"
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
        />
        <button className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
          <Filter size={15} /> Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                <th className="px-6 py-3.5 text-left font-medium">ID</th>
                <th className="px-6 py-3.5 text-left font-medium">Patient</th>
                <th className="px-6 py-3.5 text-left font-medium">Doctor</th>
                <th className="px-6 py-3.5 text-left font-medium">Date & Time</th>
                <th className="px-6 py-3.5 text-left font-medium">Type</th>
                <th className="px-6 py-3.5 text-left font-medium">Status</th>
                <th className="px-6 py-3.5 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(a => {
                const Icon = statusIcon[a.status]
                return (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-500 font-mono text-xs">{a.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-800">{a.patient}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-700">{a.doctor}</p>
                        <p className="text-gray-400 text-xs">{a.specialty}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-700 flex items-center gap-1"><CalendarDays size={12} />{a.date}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1 mt-0.5"><Clock size={12} />{a.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{a.type}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[a.status]}`}>
                        <Icon size={11} />
                        {a.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <span>Showing {filtered.length} of {appointments.length} appointments</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Prev</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
