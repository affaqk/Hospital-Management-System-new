import { useState } from 'react'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserRound, CalendarDays,
  Menu, X, Bell, ChevronDown, LogOut, Stethoscope
} from 'lucide-react'

const navItems = [
  { label: 'Overview',     icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Doctors',      icon: Stethoscope,     to: '/admin/dashboard/doctors' },
  { label: 'Patients',     icon: UserRound,       to: '/admin/dashboard/patients' },
  { label: 'Appointments', icon: CalendarDays,    to: '/admin/dashboard/appointments' },
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-shrink-0 bg-slate-900 flex flex-col transition-all duration-300`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">H+</span>
          </div>
          {sidebarOpen && <span className="text-white font-bold text-lg tracking-tight">MediAdmin</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 space-y-1 px-3">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`
              }
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">A</span>
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">Admin User</p>
                <p className="text-slate-400 text-xs truncate">admin@hospital.com</p>
              </div>
            )}
          </div>
          {sidebarOpen && (
            <button
              onClick={() => navigate('/admin-login')}
              className="mt-3 w-full flex items-center gap-2 text-slate-400 hover:text-red-400 text-sm transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-500 hover:text-gray-700">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
                <Link to = "/admin/dashboard/profile">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              </Link>
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
