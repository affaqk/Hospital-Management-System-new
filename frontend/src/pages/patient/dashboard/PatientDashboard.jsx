import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, CalendarDays, User,
  Menu, X, Bell, ChevronDown, LogOut, HeartPulse
} from 'lucide-react'

const navItems = [
  { label: 'Overview',              icon: LayoutDashboard, to: '/patient/dashboard' },
  { label: 'My Appointments',       icon: CalendarDays,    to: '/patient/dashboard/appointments' },
  { label: 'My Profile',            icon: User,            to: '/patient/dashboard/profile' },
]

export default function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} shrink-0 bg-violet-900 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-violet-700">
          <div className="w-9 h-9 bg-violet-500 rounded-lg flex items-center justify-center shrink-0">
            <HeartPulse size={18} className="text-white" />
          </div>
          {sidebarOpen && <span className="text-white font-bold text-lg tracking-tight">MediCare</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/patient/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-violet-600 text-white'
                  : 'text-violet-300 hover:bg-violet-800 hover:text-white'}`
              }
            >
              <Icon size={20} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-violet-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-violet-500 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-semibold">S</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">Sarah Johnson</p>
                <p className="text-violet-400 text-xs truncate">Patient ID: P001</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => navigate('/patient-login')}
              className="mt-3 w-full flex items-center gap-2 text-violet-400 hover:text-red-400 text-sm transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">1</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">S</span>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
