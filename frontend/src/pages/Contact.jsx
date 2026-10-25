import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-slate-400 bg-white"
  const labelClass = "block text-sm font-medium text-slate-700 mb-1.5"

  return (
    <Layout>

      {/* ── Page Banner ── */}
      <section className="bg-linear-to-br from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/15 text-blue-100 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            We're here to answer your questions and provide the support you need.
          </p>
          <div className="mt-6 flex justify-center gap-2 text-sm text-blue-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      {/* ── Info Cards ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                label: 'Our Location',
                value: '123 Medical Drive, Health City, HC 45678',
                color: 'bg-blue-100 text-blue-700',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
                label: 'Phone Number',
                value: '+1 (800) 123-4567',
                color: 'bg-teal-100 text-teal-700',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                label: 'Email Address',
                value: 'info@medicare.com',
                color: 'bg-violet-100 text-violet-700',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: 'Working Hours',
                value: 'Mon–Sat: 8AM–8PM  |  Emergency: 24/7',
                color: 'bg-amber-100 text-amber-700',
              },
            ].map(card => (
              <div key={card.label} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${card.color}`}>
                  {card.icon}
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{card.label}</p>
                <p className="text-sm font-medium text-slate-700">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form + Map ── */}
      <section className="py-10 pb-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Send Us a Message</h2>
            <p className="text-slate-500 text-sm mb-8">We'll get back to you within 24 hours.</p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Full Name *</label>
                <input type="text" placeholder="John Doe" value={form.name} onChange={set('name')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email *</label>
                <input type="email" placeholder="john@example.com" value={form.email} onChange={set('email')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone</label>
                <input type="tel" placeholder="+1 (800) 000-0000" value={form.phone} onChange={set('phone')} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Subject</label>
                <select value={form.subject} onChange={set('subject')} className={inputClass}>
                  <option value="">Select subject</option>
                  <option>General Inquiry</option>
                  <option>Appointment Query</option>
                  <option>Billing & Insurance</option>
                  <option>Medical Records</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>Message *</label>
                <textarea
                  rows={5}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={set('message')}
                  className={inputClass + ' resize-none'}
                />
              </div>
            </div>
            <button className="mt-6 w-full py-3.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-100">
              Send Message
            </button>
          </div>

          {/* Map placeholder + hours */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 bg-slate-200 rounded-2xl overflow-hidden min-h-64 flex items-center justify-center border border-slate-200">
              <div className="text-center text-slate-400">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium">Map will load here</p>
                <p className="text-xs mt-1">123 Medical Drive, Health City</p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Office Hours
              </h3>
              <div className="space-y-2.5">
                {[
                  { day: 'Monday – Friday', hours: '8:00 AM – 8:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Sunday', hours: 'Emergency Only' },
                  { day: 'Emergency Department', hours: '24 Hours / 7 Days' },
                ].map(row => (
                  <div key={row.day} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{row.day}</span>
                    <span className={`font-medium ${row.hours.includes('24') ? 'text-red-600' : 'text-slate-800'}`}>
                      {row.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </Layout>
  )
}

export default Contact
