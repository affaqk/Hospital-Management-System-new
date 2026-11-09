import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react'

const RESET_APIS = [
  'http://localhost:8000/api/admin/reset-password',
  'http://localhost:8000/api/doctors/reset-password',
  'http://localhost:8000/api/patients/reset-password',
]

export default function ResetPassword() {
  const { token } = useParams()
  const navigate  = useNavigate()

  const [form, setForm]           = useState({ password: '', confirmPassword: '' })
  const [showPass, setShowPass]   = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    setError('')
    setLoading(true)

    let succeeded = false
    for (const api of RESET_APIS) {
      try {
        await axios.put(`${api}/${token}`, {
          password: form.password,
          confirmPassword: form.confirmPassword,
        })
        succeeded = true
        break
      } catch {
        // token not found in this collection — try next
      }
    }

    setLoading(false)
    if (succeeded) {
      setSuccess(true)
    } else {
      setError('Reset link is invalid or has expired. Please request a new one.')
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Password updated!</h2>
          <p className="text-gray-500 text-sm mb-8">
            Your password has been reset successfully. Sign in with your new password.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/patient-login')}
              className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition">
              Patient Login
            </button>
            <button onClick={() => navigate('/doctor-login')}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition">
              Doctor Login
            </button>
            <button onClick={() => navigate('/admin-login')}
              className="w-full py-2.5 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition">
              Admin Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
        <div className="mb-7">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Lock size={26} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Set new password</h2>
          <p className="text-gray-500 text-sm mt-1">
            Choose a strong password for your account.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
            <AlertCircle size={15} className="shrink-0 mt-0.5" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 8 characters"
                required
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Repeat your new password"
                required
                className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition text-sm disabled:opacity-60">
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-2 text-center">
          <p className="text-xs text-gray-400">Remember your password? Sign in as:</p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => navigate('/patient-login')} className="text-xs text-violet-600 hover:underline">Patient</button>
            <span className="text-gray-300">·</span>
            <button onClick={() => navigate('/doctor-login')}  className="text-xs text-emerald-600 hover:underline">Doctor</button>
            <span className="text-gray-300">·</span>
            <button onClick={() => navigate('/admin-login')}   className="text-xs text-slate-600 hover:underline">Admin</button>
          </div>
        </div>
      </div>
    </div>
  )
}
