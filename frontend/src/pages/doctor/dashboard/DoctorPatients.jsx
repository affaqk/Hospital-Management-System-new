import { useState } from 'react'
import { Search, ChevronRight, HeartPulse, AlertCircle } from 'lucide-react'

const patients = [
  { id: 'P001', name: 'Sarah Johnson',  age: 34, blood: 'A+',  condition: 'Hypertension',  lastVisit: 'Oct 20', nextVisit: 'Nov 03', visits: 8,  risk: 'Low' },
  { id: 'P002', name: 'Mark Williams',  age: 52, blood: 'O+',  condition: 'Arrhythmia',    lastVisit: 'Oct 18', nextVisit: 'Oct 28', visits: 14, risk: 'High' },
  { id: 'P003', name: 'Emily Davis',    age: 28, blood: 'B-',  condition: 'Chest Pain',    lastVisit: 'New',    nextVisit: 'Oct 24', visits: 1,  risk: 'Medium' },
  { id: 'P004', name: 'Robert Brown',   age: 67, blood: 'AB+', condition: 'Heart Failure', lastVisit: 'Sep 30', nextVisit: 'Oct 30', visits: 22, risk: 'High' },
  { id: 'P005', name: 'Linda Martinez', age: 41, blood: 'A-',  condition: 'Tachycardia',   lastVisit: 'Oct 22', nextVisit: 'Nov 05', visits: 6,  risk: 'Low' },
]

const riskStyle = {
  Low:    'bg-emerald-100 text-emerald-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High:   'bg-red-100 text-red-700',
}

export default function DoctorPatients() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.condition.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
        <p className="text-gray-500 text-sm mt-0.5">{patients.length} patients under your care</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* Patient list */}
        <div className="xl:col-span-2 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients or condition..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="space-y-3">
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => setSelected(p)}
                className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${
                  selected?.id === p.id ? 'border-emerald-400 shadow-md' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <span className="text-emerald-700 font-semibold">{p.name[0]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800">{p.name}</p>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${riskStyle[p.risk]}`}>
                        {p.risk} Risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{p.condition} · Age {p.age} · Blood {p.blood}</p>
                    <p className="text-xs text-gray-400 mt-1">Last visit: {p.lastVisit} · Next: {p.nextVisit}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 shrink-0" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient detail panel */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-fit">
          {selected ? (
            <>
              <div className="bg-emerald-700 p-6 text-white">
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold">{selected.name[0]}</span>
                </div>
                <p className="text-center font-semibold mt-2">{selected.name}</p>
                <p className="text-center text-emerald-200 text-sm">{selected.id}</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    ['Age', `${selected.age} years`],
                    ['Blood Type', selected.blood],
                    ['Total Visits', selected.visits],
                    ['Risk Level', selected.risk],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <p className="text-gray-400 text-xs">{k}</p>
                      <p className="font-medium text-gray-800 mt-0.5">{v}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-gray-400 mb-1">Primary Condition</p>
                  <div className="flex items-center gap-2">
                    <HeartPulse size={16} className="text-red-500" />
                    <p className="font-medium text-gray-800">{selected.condition}</p>
                  </div>
                </div>
                {selected.risk === 'High' && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-2">
                    <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-600">High risk patient — requires close monitoring.</p>
                  </div>
                )}
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                  View Full Record
                </button>
                <button className="w-full border border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-sm font-medium py-2.5 rounded-lg transition-colors">
                  Schedule Appointment
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-gray-400">
              <UserRound size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a patient to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

