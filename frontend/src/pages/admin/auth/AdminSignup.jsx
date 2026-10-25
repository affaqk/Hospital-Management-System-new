import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck } from 'lucide-react'

const AdminSignup = () => {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => setAdmin({ ...admin, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/admin/register', admin, { withCredentials: true })
      navigate('/admin/dashboard')
    } catch (error) {
      console.log(error)
    }
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
            Create your<br />
            <span className="text-blue-400">Admin Account</span>
          </h1>
          <p className="text-slate-400 text-base mb-10">
            Get access to the full hospital management suite in minutes.
          </p>
          <div className="space-y-4">
            {[
              'Manage the entire hospital digitally',
              'Approve and assign doctor accounts',
              'Monitor all appointments in real-time',
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
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-white">H+</div>
            <span className="font-bold text-xl text-gray-800">MediAdmin</span>
          </div>

          <div className="mb-8">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck size={26} className="text-slate-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create admin account</h2>
            <p className="text-gray-500 text-sm mt-1">Register your administrator profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={admin.email}
                  onChange={handleChange}
                  placeholder="admin@hospital.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/admin-login" className="text-slate-700 hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminSignup
