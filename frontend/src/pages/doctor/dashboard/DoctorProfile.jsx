import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  ArrowLeft, Mail, Phone, User, Stethoscope, BadgeCheck,
  Calendar, Clock, ShieldCheck, Pencil, LogOut, Trash2, X, Save, KeyRound
} from 'lucide-react'

const SPECIALISATIONS = [
  'General Physician', 'Dermatologist', 'Cardialogist', 'ENT', 'Psychologist', 'Dentist'
]

const DoctorProfile = () => {
  const [loading, setLoading] = useState(true)
  const [doctor, setDoctor] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(false)
  const [showPwModal, setShowPwModal] = useState(false)
  const [pwData, setPwData] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const navigate = useNavigate()

  const getDoctorProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/doctors/profile', {
        withCredentials: true,
      })
      setDoctor(response.data.doctor)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getDoctorProfile()
  }, [])

  const openEditModal = () => {
    setEditData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      age: doctor.age,
      experience: doctor.experience,
      gender: doctor.gender,
      specialisation: doctor.specialisation,
      license: doctor.license,
    })
    setShowEditModal(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const response = await axios.put('http://localhost:8000/api/doctors/update', editData, {
        withCredentials: true,
      })
      setDoctor(response.data.doctor)
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
      await axios.delete('http://localhost:8000/api/doctors/delete', { withCredentials: true })
      localStorage.removeItem('role')
      navigate('/doctor-login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/doctors/logout', { withCredentials: true })
      localStorage.removeItem('role')
      navigate('/doctor-login')
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
      await axios.put('http://localhost:8000/api/doctors/update-password', pwData, { withCredentials: true })
      setPwSuccess('Password updated successfully.')
      setPwData({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
      setTimeout(() => { setShowPwModal(false); setPwSuccess('') }, 1500)
    } catch (error) {
      setPwError(error.response?.data?.message || 'Failed to update password.')
    } finally {
      setPwSaving(false)
    }
  }

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400 text-sm">
        Failed to load profile.
      </div>
    )
  }

  const initials = doctor.name
    .trim()
    .split(' ')
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate('/doctor/dashboard')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <Stethoscope size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-800 text-lg tracking-tight hidden sm:block">MediDoc</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Hero card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-emerald-600 to-emerald-400" />
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold text-emerald-600">{initials}</span>
              </div>
              <div className="flex-1 pb-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{doctor.name}</h1>
                  <span className={`self-start px-3 py-0.5 rounded-full text-xs font-semibold ${
                    doctor.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {doctor.status}
                  </span>
                </div>
                <p className="text-emerald-600 font-medium mt-0.5">{doctor.specialisation}</p>
                <p className="text-gray-400 text-sm mt-0.5 capitalize">{doctor.role}</p>
              </div>
              <div className="flex gap-2 pb-1">
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Personal Information</h2>
            <InfoRow icon={<User size={16} />} label="Full Name" value={doctor.name} />
            <InfoRow icon={<User size={16} />} label="Age" value={`${doctor.age} years`} />
            <InfoRow icon={<User size={16} />} label="Gender" value={doctor.gender} />
            <InfoRow icon={<Mail size={16} />} label="Email" value={doctor.email} />
            <InfoRow icon={<Phone size={16} />} label="Phone" value={doctor.phone} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Professional Details</h2>
            <InfoRow icon={<Stethoscope size={16} />} label="Specialisation" value={doctor.specialisation} />
            <InfoRow icon={<Clock size={16} />} label="Experience" value={`${doctor.experience} years`} />
            <InfoRow icon={<BadgeCheck size={16} />} label="License No." value={doctor.license} />
            <InfoRow icon={<ShieldCheck size={16} />} label="Status" value={doctor.status} highlight={doctor.status === 'Approved'} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Account Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <InfoRow icon={<Calendar size={16} />} label="Member Since" value={formatDate(doctor.createdAt)} />
            <InfoRow icon={<Clock size={16} />} label="Last Updated" value={formatDate(doctor.updatedAt)} />
            <InfoRow icon={<User size={16} />} label="Account ID" value={doctor._id} mono />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h2 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-4">Danger Zone</h2>
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

      {showPwModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
              <button onClick={() => setShowPwModal(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            {pwError   && <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2.5 rounded-xl mb-4">{pwError}</p>}
            {pwSuccess && <p className="text-sm text-emerald-600 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl mb-4">{pwSuccess}</p>}
            <form onSubmit={handleChangePassword} className="space-y-4">
              {[
                { label: 'Current Password',    field: 'oldPassword' },
                { label: 'New Password',         field: 'newPassword' },
                { label: 'Confirm New Password', field: 'confirmNewPassword' },
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                  <input type="password" value={pwData[field]}
                    onChange={e => setPwData({ ...pwData, [field]: e.target.value })} required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPwModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={pwSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60">
                  <Save size={14} /> {pwSaving ? 'Saving...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={editData.name || ''}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={editData.phone || ''}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={editData.age || ''}
                    onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience (years)</label>
                  <input
                    type="number"
                    value={editData.experience || ''}
                    onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                  <select
                    value={editData.gender || ''}
                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialisation</label>
                  <select
                    value={editData.specialisation || ''}
                    onChange={(e) => setEditData({ ...editData, specialisation: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  >
                    {SPECIALISATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">License No.</label>
                  <input
                    type="text"
                    value={editData.license || ''}
                    onChange={(e) => setEditData({ ...editData, license: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>
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
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
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

function InfoRow({ icon, label, value, highlight, mono }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className={`text-sm font-medium ${
          highlight ? 'text-emerald-600' : 'text-gray-800'
        } ${mono ? 'font-mono text-xs break-all' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default DoctorProfile
