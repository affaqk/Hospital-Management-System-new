import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const steps = ['Personal Info', 'Choose Department', 'Select Date & Time', 'Confirm']

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']

const Appointment = () => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', age: '', gender: '',
    department: '', doctor: '', date: '', time: '', message: '',
  })

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 bg-white"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5"

  return (
    <Layout>

      {/* ── Page Banner ── */}
      <section className="bg-linear-to-br from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/15 text-blue-100 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
            Appointments
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Book Your Appointment
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Schedule a consultation with one of our specialists in just a few steps.
          </p>
          <div className="mt-6 flex justify-center gap-2 text-sm text-blue-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Appointment</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Steps indicator */}
          <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  i === 0 ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === 0 ? 'text-blue-700' : 'text-slate-400'}`}>
                  {step}
                </span>
                {i < steps.length - 1 && <div className="flex-1 h-px bg-slate-200 mx-2"></div>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-800 mb-8">Fill in your details</h2>

            <div className="grid sm:grid-cols-2 gap-5">

              {/* Personal Info */}
              <div>
                <label className={labelClass}>Full Name *</label>
                <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email Address *</label>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone Number *</label>
                <input type="tel" placeholder="+1 (800) 000-0000" value={form.phone} onChange={set('phone')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Age</label>
                <input type="number" placeholder="Enter your age" value={form.age} onChange={set('age')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select value={form.gender} onChange={set('gender')} className={inputClass}>
                  <option value="">Select gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Department *</label>
                <select value={form.department} onChange={set('department')} className={inputClass}>
                  <option value="">Select department</option>
                  {['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency Care', 'Diagnostics', 'Gynecology', 'Pulmonology'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Preferred Doctor</label>
                <select value={form.doctor} onChange={set('doctor')} className={inputClass}>
                  <option value="">Any available doctor</option>
                  {['Dr. Sarah Mitchell', 'Dr. James Carter', 'Dr. Aisha Rahman', 'Dr. Robert Chen', 'Dr. Linda Foster', 'Dr. Michael Torres'].map(d => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Preferred Date *</label>
                <input type="date" value={form.date} onChange={set('date')} className={inputClass} />
              </div>
            </div>

            {/* Time Slots */}
            <div className="mt-6">
              <label className={labelClass}>Preferred Time</label>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, time: slot }))}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      form.time === slot
                        ? 'bg-blue-700 text-white border-blue-700'
                        : 'border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mt-5">
              <label className={labelClass}>Additional Notes</label>
              <textarea
                rows={3}
                placeholder="Describe your symptoms or any additional information..."
                value={form.message}
                onChange={set('message')}
                className={inputClass + ' resize-none'}
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button className="flex-1 py-3.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-100">
                Confirm Appointment
              </button>
              <Link to="/" className="flex-1 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-center">
                Cancel
              </Link>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '📞', title: 'Phone Booking', desc: 'Call +1 (800) 123-4567 between 8AM–8PM' },
              { icon: '🕐', title: 'Same-Day Appointments', desc: 'Available for urgent cases — call early' },
              { icon: '✅', title: 'Confirmation', desc: 'You will receive an SMS & email confirmation' },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-xl p-5 border border-slate-100 flex items-start gap-3">
                <span className="text-2xl">{card.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{card.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </Layout>
  )
}

export default Appointment
