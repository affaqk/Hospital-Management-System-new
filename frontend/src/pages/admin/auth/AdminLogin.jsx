import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [admin, setAdmin]       = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loginError, setLoginError] = useState('')

  const [view, setView]               = useState('login') // 'login' | 'forgot'
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotSent, setForgotSent]   = useState(false)
  const [forgotError, setForgotError] = useState('')

  const handleChange = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')
    try {
      await axios.post('http://localhost:8000/api/admin/login', admin, { withCredentials: true })
      localStorage.setItem('role', 'admin')
      navigate('/admin/dashboard')
    } catch (error) {
      setLoginError(error.response?.data?.message || 'Invalid credentials.')
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setForgotError('')
    setForgotLoading(true)
    try {
      await axios.post('http://localhost:8000/api/admin/reset-password-request', { email: forgotEmail })
      setForgotSent(true)
    } catch (error) {
      setForgotError(error.response?.data?.message || 'Could not send reset email. Check the address and try again.')
    } finally {
      setForgotLoading(false)
    }
  }

  const goBackToLogin = () => {
    setView('login')
    setForgotEmail('')
    setForgotSent(false)
    setForgotError('')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-slate-800 to-slate-950 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center font-bold text-lg">H+</div>
          <span className="font-bold text-xl tracking-tight">MediAdmin</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Hospital Management<br />
            <span className="text-blue-400">Admin Portal</span>
          </h1>
          <p className="text-slate-400 text-base mb-10">
            Manage doctors, patients, appointments and hospital operations from one place.
          </p>
          <div className="space-y-4">
            {[
              'Full control over doctors & patients',
              'Real-time appointment tracking',
              'Comprehensive analytics & reports',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-600 text-sm">© 2026 Hospital Management System</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-white">H+</div>
            <span className="font-bold text-xl text-gray-800">MediAdmin</span>
          </div>

          {/* ── LOGIN VIEW ── */}
          {view === 'login' && (
            <>
              <div className="mb-8">
                <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                  <ShieldCheck size={26} className="text-slate-700" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                <p className="text-gray-500 text-sm mt-1">Sign in to your admin account</p>
              </div>

              {loginError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                  <AlertCircle size={15} className="shrink-0" /> {loginError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email" name="email" value={admin.email} onChange={handleChange}
                      placeholder="admin@hospital.com" required
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <button type="button" onClick={() => setView('forgot')}
                      className="text-xs text-slate-600 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPass ? 'text' : 'password'} name="password"
                      value={admin.password} onChange={handleChange}
                      placeholder="••••••••" required
                      className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition text-sm">
                  Sign In
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{' '}
                <Link to="/admin-signup" className="text-slate-700 hover:underline font-semibold">Register</Link>
              </p>

              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400">or login as</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => navigate('/doctor-login')}
                    className="py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                    Doctor Login
                  </button>
                  <button onClick={() => navigate('/patient-login')}
                    className="py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-100 transition">
                    Patient Login
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── FORGOT PASSWORD VIEW ── */}
          {view === 'forgot' && (
            <>
              <button onClick={goBackToLogin}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-8 transition">
                <ArrowLeft size={16} /> Back to login
              </button>

              {forgotSent ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
                  <p className="text-gray-500 text-sm mb-1">
                    We sent a password reset link to
                  </p>
                  <p className="font-semibold text-gray-800 text-sm mb-6">{forgotEmail}</p>
                  <p className="text-gray-400 text-xs">Didn't receive it?{' '}
                    <button onClick={() => setForgotSent(false)} className="text-slate-600 underline">Try again</button>
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                      <Mail size={26} className="text-slate-700" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Enter your admin email and we'll send you a reset link.
                    </p>
                  </div>

                  {forgotError && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" /> {forgotError}
                    </div>
                  )}

                  <form onSubmit={handleForgotPassword} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email" value={forgotEmail}
                          onChange={e => setForgotEmail(e.target.value)}
                          placeholder="admin@hospital.com" required
                          className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={forgotLoading}
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition text-sm disabled:opacity-60">
                      {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
