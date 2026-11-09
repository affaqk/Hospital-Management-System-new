import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Phone, Mail, HeartPulse, Calendar, Clock, Pencil, LogOut, Trash2, X, Save, KeyRound } from 'lucide-react'
import axios from 'axios'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export default function PatientProfile() {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editData, setEditData] = useState({})
  const [saving, setSaving] = useState(false)
  const [showPwModal, setShowPwModal] = useState(false)
  const [pwData, setPwData] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')
  const navigate = useNavigate()

  const getPatientProfile = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/patients/profile', {
        withCredentials: true
      })
      setPatient(response.data.patient)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPatientProfile()
  }, [])

  const openEditModal = () => {
    setEditData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      age: patient.age,
      disease: patient.disease,
      gender: patient.gender,
      bloodGroup: patient.bloodGroup,
    })
    setShowEditModal(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const response = await axios.put('http://localhost:8000/api/patients/update', editData, {
        withCredentials: true
      })
      setPatient(response.data.patient)
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
      await axios.delete('http://localhost:8000/api/patients/delete', { withCredentials: true })
      localStorage.removeItem('role')
      navigate('/patient-login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/patients/logout', { withCredentials: true })
      localStorage.removeItem('role')
      navigate('/patient-login')
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
      await axios.put('http://localhost:8000/api/patients/update-password', pwData, { withCredentials: true })
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
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Failed to load profile.
      </div>
    )
  }

  const initials = patient.name
    .trim()
    .split(' ')
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-violet-600 to-violet-400" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-violet-600">{initials}</span>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <span className="self-start px-3 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600">
                  {patient.bloodGroup}
                </span>
              </div>
              <p className="text-violet-600 font-medium mt-0.5 capitalize">{patient.disease}</p>
              <p className="text-gray-400 text-sm mt-0.5 capitalize">{patient.role}</p>
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
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
            <User size={15} className="text-violet-500" /> Personal Information
          </h2>
          <InfoRow icon={<User size={16} />} label="Full Name" value={patient.name} color="violet" />
          <InfoRow icon={<User size={16} />} label="Age" value={`${patient.age} years`} color="violet" />
          <InfoRow icon={<User size={16} />} label="Gender" value={patient.gender} color="violet" />
          <InfoRow icon={<Mail size={16} />} label="Email" value={patient.email} color="violet" />
          <InfoRow icon={<Phone size={16} />} label="Phone" value={patient.phone} color="violet" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
            <HeartPulse size={15} className="text-red-500" /> Medical Information
          </h2>
          <InfoRow icon={<HeartPulse size={16} />} label="Blood Group" value={patient.bloodGroup} color="red" />
          <InfoRow icon={<HeartPulse size={16} />} label="Disease / Condition" value={patient.disease} color="red" capitalize />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <InfoRow icon={<Calendar size={16} />} label="Member Since" value={formatDate(patient.createdAt)} color="violet" />
          <InfoRow icon={<Clock size={16} />} label="Last Updated" value={formatDate(patient.updatedAt)} color="violet" />
          <InfoRow icon={<User size={16} />} label="Account ID" value={patient._id} color="violet" mono />
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
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowPwModal(false)}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button type="submit" disabled={pwSaving}
                  className="flex-1 flex items-center justify-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60">
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
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={editData.email || ''}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input
                    type="text"
                    value={editData.phone || ''}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                  <input
                    type="number"
                    value={editData.age || ''}
                    onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                  <select
                    value={editData.gender || ''}
                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Blood Group</label>
                  <select
                    value={editData.bloodGroup || ''}
                    onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                  >
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Disease / Condition</label>
                  <input
                    type="text"
                    value={editData.disease || ''}
                    onChange={(e) => setEditData({ ...editData, disease: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
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
                  className="flex-1 flex items-center justify-center gap-2 bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold py-2.5 rounded-xl transition disabled:opacity-60"
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

function InfoRow({ icon, label, value, color = 'violet', mono, capitalize }) {
  const colorMap = {
    violet: 'bg-violet-50 text-violet-500',
    red: 'bg-red-50 text-red-500',
  }
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className={`text-sm font-medium text-gray-800 ${mono ? 'font-mono text-xs break-all' : ''} ${capitalize ? 'capitalize' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
