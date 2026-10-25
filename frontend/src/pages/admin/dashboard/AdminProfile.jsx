import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Mail, ShieldCheck, CalendarDays, Clock,
  Hash, User, Pencil, LogOut
} from 'lucide-react'

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const getAdminProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/profile', {
        withCredentials: true,
      })
      setAdmin(response.data.admin)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAdminProfile()
  }, [])

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
  }

  const formatDateTime = (iso) => {
    if (!iso) return '—'
    return new Date(iso).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const initials = (name) =>
    name ? name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : 'A'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">
            H+
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight hidden sm:block">MediAdmin</span>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {loading ? (
          /* Skeleton */
          <div className="space-y-4 animate-pulse">
            <div className="bg-white rounded-2xl p-8 flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-40" />
                <div className="h-4 bg-gray-200 rounded w-56" />
                <div className="h-5 bg-gray-100 rounded w-16" />
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 space-y-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-100 rounded w-24" />
                  <div className="h-4 bg-gray-200 rounded w-40" />
                </div>
              ))}
            </div>
          </div>
        ) : admin ? (
          <div className="space-y-5">
            {/* Profile header card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700" />
              <div className="px-8 pb-8">
                <div className="-mt-10 mb-4 flex items-end justify-between">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{initials(admin.name)}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                      <Pencil size={14} /> Edit Profile
                    </button>
                    <button
                      onClick={() => navigate('/admin-login')}
                      className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900">{admin.name}</h1>
                <p className="text-gray-500 text-sm mt-0.5">{admin.email}</p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    <ShieldCheck size={12} />
                    {admin.role ? admin.role.charAt(0).toUpperCase() + admin.role.slice(1) : 'Admin'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Details card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-5">
                Account Information
              </h2>
              <div className="space-y-5">
                <Row icon={User} label="Full Name" value={admin.name} />
                <Row icon={Mail} label="Email Address" value={admin.email} />
                <Row icon={ShieldCheck} label="Role" value={
                  <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {admin.role}
                  </span>
                } />
                <Row icon={Hash} label="Account ID" value={
                  <span className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {admin._id}
                  </span>
                } />
                <Row icon={CalendarDays} label="Member Since" value={formatDate(admin.createdAt)} />
                <Row icon={Clock} label="Last Updated" value={formatDateTime(admin.updatedAt)} />
              </div>
            </div>

            {/* Security card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-5">
                Security
              </h2>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-700">Password</p>
                  <p className="text-xs text-gray-400 mt-0.5">Last changed on {formatDate(admin.updatedAt)}</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:underline">Change</button>
              </div>
              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-400 mt-0.5">Add extra security to your account</p>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:underline">Enable</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-gray-400 shadow-sm border border-gray-100">
            <User size={40} className="mx-auto mb-3 opacity-30" />
            <p>Could not load profile. Please try again.</p>
            <button onClick={getAdminProfile} className="mt-4 text-blue-600 text-sm font-medium hover:underline">
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
      <Icon size={16} className="text-gray-500" />
    </div>
    <div className="flex-1 min-w-0 flex items-center justify-between gap-4 py-0.5">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-800 text-right">{value}</span>
    </div>
  </div>
)

export default AdminProfile
