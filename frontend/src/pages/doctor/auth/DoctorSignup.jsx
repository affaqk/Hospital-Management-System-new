import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Phone, BadgeCheck, Stethoscope } from 'lucide-react'

const SPECIALISATIONS = [
  'General Physician', 'Dermatologist', 'Cardiologist',
  'ENT', 'Psychologist', 'Dentist', 'Neurologist',
  'Orthopedics', 'Pediatrics',
]

const DoctorSignup = () => {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState({
    name: '', email: '', password: '', phone: '',
    specialisation: '', license: '', age: '', experience: '', gender: '',
  })
  const [showPass, setShowPass] = useState(false)

  const handleChange = (e) => setDoctor({ ...doctor, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/doctors/register', doctor, { withCredentials: true })
      navigate('/doctor/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const inputCls = 'w-full py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition'
  const iconInputCls = `${inputCls} pl-10 pr-4`

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
            Join Our<br />
            <span className="text-emerald-300">Medical Team</span>
          </h1>
          <p className="text-emerald-200 text-base mb-10">
            Register as a doctor and start managing your patients and appointments digitally.
          </p>
          <div className="space-y-4">
            {[
              'Digital patient management',
              'Automated appointment scheduling',
              'Secure medical record access',
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
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">
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
            <h2 className="text-2xl font-bold text-gray-900">Doctor Registration</h2>
            <p className="text-gray-500 text-sm mt-1">Fill in your details to apply for a doctor account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={doctor.name} onChange={handleChange}
                    placeholder="Dr. John Doe" required className={iconInputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" name="email" value={doctor.email} onChange={handleChange}
                    placeholder="doctor@email.com" required className={iconInputCls} />
                </div>
              </div>
            </div>

            {/* Password + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} name="password" value={doctor.password}
                    onChange={handleChange} placeholder="••••••••" required
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" name="phone" value={doctor.phone} onChange={handleChange}
                    placeholder="03001234567" maxLength={11} required className={iconInputCls} />
                </div>
              </div>
            </div>

            {/* Specialisation + License */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Specialisation</label>
                <select name="specialisation" value={doctor.specialisation} onChange={handleChange}
                  required className={`${inputCls} px-4 text-gray-700`}>
                  <option value="">Select Specialisation</option>
                  {SPECIALISATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">License Number</label>
                <div className="relative">
                  <BadgeCheck size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="license" value={doctor.license} onChange={handleChange}
                    placeholder="PMDC-12345" required className={iconInputCls} />
                </div>
              </div>
            </div>

            {/* Age + Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input type="number" name="age" value={doctor.age} onChange={handleChange}
                  placeholder="e.g. 35" min={18} max={80} required className={`${inputCls} px-4`} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Experience (years)</label>
                <input type="number" name="experience" value={doctor.experience} onChange={handleChange}
                  placeholder="e.g. 10" min={0} max={60} required className={`${inputCls} px-4`} />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex gap-3">
                {['Male', 'Female'].map((g) => (
                  <label key={g} className={`flex-1 flex items-center justify-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border text-sm font-medium transition
                    ${doctor.gender === g ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400'}`}>
                    <input type="radio" name="gender" value={g} checked={doctor.gender === g}
                      onChange={handleChange} className="hidden" />
                    {g === 'Male' ? '♂ Male' : '♀ Female'}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition text-sm">
              Submit Application
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/doctor-login" className="text-emerald-700 hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorSignup
