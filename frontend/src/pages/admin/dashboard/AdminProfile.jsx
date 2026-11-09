import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Mail, ShieldCheck, CalendarDays, Clock,
  Hash, User, Pencil, LogOut, Trash2, X, Save, KeyRound
} from 'lucide-react'

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({ name: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [showPwModal, setShowPwModal] = useState(false)
  const [pwData, setPwData] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
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

  const openEditModal = () => {
    setEditData({ name: admin.name, email: admin.email })
    setShowEditModal(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const response = await axios.put('http://localhost:8000/api/admin/update', editData, {
        withCredentials: true,
      })
      setAdmin(response.data.admin)
      setShowEditModal(false)
    } catch (error) {
      console.log(error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    try {
      await axios.delete('http://localhost:8000/api/admin/delete', { withCredentials: true })
      localStorage.removeItem('role')
      navigate('/admin-login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/admin/logout', { withCredentials: true })
      localStorage.removeItem('role')
      navigate('/admin-login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPwError('')
    setPwSuccess('')
    if (pwData.newPassword !== pwData.confirmNewPassword) {
      setPwError('New passwords do not match.')
      return
    }
    setPwSaving(true)
    try {
      await axios.put('http://localhost:8000/api/admin/update-password', pwData, { withCredentials: true })
      setPwSuccess('Password updated successfully.')
      setPwData({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
      setTimeout(() => { setShowPwModal(false); setPwSuccess('') }, 1500)
    } catch (error) {
      setPwError(error.response?.data?.message || 'Failed to update password.')
    } finally {
      setPwSaving(false)
    }
  }

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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-slate-800 to-slate-700" />
              <div className="px-8 pb-8">
                <div className="-mt-10 mb-4 flex items-end justify-between">
                  <div className="w-20 h-20 rounded-2xl bg-blue-500 border-4 border-white shadow-md flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">{initials(admin.name)}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={openEditModal}
                      className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      <Pencil size={14} /> Edit Profile
                    </button>
                    <button
                      onClick={() => { setPwError(''); setPwSuccess(''); setShowPwModal(true) }}
                      className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      <KeyRound size={14} /> Change Password
                    </button>
                    <button
                      onClick={handleLogout}
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

            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
              <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-4">
                Danger Zone
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Delete Account</p>
                  <p className="text-xs text-gray-400 mt-0.5">Permanently remove your account and all data</p>
                </div>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <Trash2 size={14} /> Delete Account
                </button>
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

      {showPwModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
              <button onClick={() => setShowPwModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            {pwError && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl mb-4">{pwError}</p>}
            {pwSuccess && <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl mb-4">{pwSuccess}</p>}
            <form onSubmit={handleChangePassword} className="space-y-4">
              {[
                { label: 'Current Password',      field: 'oldPassword' },
                { label: 'New Password',           field: 'newPassword' },
                { label: 'Confirm New Password',   field: 'confirmNewPassword' },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input
                    type="password"
                    value={pwData[field]}
                    onChange={e => setPwData({ ...pwData, [field]: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPwModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={pwSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60">
                  <Save size={14} /> {pwSaving ? 'Saving...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
                >
                  <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
