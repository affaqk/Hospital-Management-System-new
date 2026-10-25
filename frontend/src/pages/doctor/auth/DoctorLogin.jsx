import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Stethoscope } from 'lucide-react'

const DoctorLogin = () => {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => setDoctor({ ...doctor, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/doctors/login', doctor, { withCredentials: true })
      navigate('/doctor/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-emerald-700 to-emerald-950 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Stethoscope size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">MediDoc</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Doctor<br />
            <span className="text-emerald-300">Login Portal</span>
          </h1>
          <p className="text-emerald-200 text-base mb-10">
            Access your schedule, patient records, and appointment details securely.
          </p>
          <div className="space-y-4">
            {[
              "View today's patient schedule",
              'Access complete medical records',
              'Manage and update appointments',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-emerald-300" />
                </div>
                <span className="text-emerald-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-emerald-800 text-sm">© 2026 Hospital Management System</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center">
              <Stethoscope size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">MediDoc</span>
          </div>

          <div className="mb-8">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4">
              <Stethoscope size={26} className="text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back, Doctor</h2>
            <p className="text-gray-500 text-sm mt-1">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={doctor.email}
                  onChange={handleChange}
                  placeholder="doctor@hospital.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <button type="button" className="text-xs text-emerald-600 hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={doctor.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
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
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition text-sm"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/doctor-signup" className="text-emerald-700 hover:underline font-semibold">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin
