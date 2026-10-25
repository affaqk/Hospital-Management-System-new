import axios from 'axios'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, User, Phone, HeartPulse, Droplets } from 'lucide-react'

const PatientSignup = () => {
  const navigate = useNavigate()
  const [patient, setPatient] = useState({
    name: '', email: '', phone: '', age: '',
    password: '', disease: '', bloodGroup: '', gender: '',
  })
  const [showPass, setShowPass] = useState(false)

  const handleState = (e) => setPatient({ ...patient, [e.target.name]: e.target.value })

  const submitForm = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8000/api/patients/register', patient, { withCredentials: true })
      navigate('/patient/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  const inputCls = 'w-full py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition'
  const iconInputCls = `${inputCls} pl-10 pr-4`

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-5/12 bg-linear-to-br from-violet-700 to-violet-950 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <HeartPulse size={20} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">MediCare</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Start Your<br />
            <span className="text-violet-300">Health Journey</span>
          </h1>
          <p className="text-violet-200 text-base mb-10">
            Create your patient profile and take control of your healthcare experience.
          </p>
          <div className="space-y-4">
            {[
              'Track your health history digitally',
              'Get appointment reminders',
              'View prescriptions & doctor notes',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-violet-300" />
                </div>
                <span className="text-violet-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-violet-800 text-sm">© 2026 Hospital Management System</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-violet-700 rounded-xl flex items-center justify-center">
              <HeartPulse size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl text-gray-800">MediCare</span>
          </div>

          <div className="mb-8">
            <div className="w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center mb-4">
              <HeartPulse size={26} className="text-violet-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Patient Account</h2>
            <p className="text-gray-500 text-sm mt-1">Fill in your details to register</p>
          </div>

          <form onSubmit={submitForm} className="space-y-5">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="name" value={patient.name} onChange={handleState}
                    placeholder="Sarah Johnson" required className={iconInputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="email" name="email" value={patient.email} onChange={handleState}
                    placeholder="your@email.com" required className={iconInputCls} />
                </div>
              </div>
            </div>

            {/* Phone + Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" name="phone" value={patient.phone} onChange={handleState}
                    placeholder="+1 555-0101" required className={iconInputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input type="number" name="age" value={patient.age} onChange={handleState}
                  placeholder="e.g. 28" min={1} max={120} required className={`${inputCls} px-4`} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} name="password" value={patient.password}
                  onChange={handleState} placeholder="••••••••" required
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Disease + Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Condition / Disease</label>
                <div className="relative">
                  <HeartPulse size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="disease" value={patient.disease} onChange={handleState}
                    placeholder="e.g. Hypertension" className={iconInputCls} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Blood Group</label>
                <div className="relative">
                  <Droplets size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select name="bloodGroup" value={patient.bloodGroup} onChange={handleState}
                    className={`${inputCls} pl-10 pr-4 text-gray-700`}>
                    <option value="">Select blood group</option>
                    {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex gap-3">
                {['Male', 'Female', 'Other'].map((g) => (
                  <label key={g} className={`flex-1 flex items-center justify-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border text-sm font-medium transition
                    ${patient.gender === g ? 'bg-violet-600 text-white border-violet-600' : 'bg-white text-gray-600 border-gray-200 hover:border-violet-400'}`}>
                    <input type="radio" name="gender" value={g} checked={patient.gender === g}
                      onChange={handleState} className="hidden" />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit"
              className="w-full bg-violet-700 hover:bg-violet-800 text-white font-semibold py-3 rounded-xl transition text-sm">
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/patient-login" className="text-violet-700 hover:underline font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PatientSignup
