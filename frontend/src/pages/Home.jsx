import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { services } from '../data/services'
import { doctors } from '../data/doctors'

const stats = [
  { value: '25,000+', label: 'Patients Treated' },
  { value: '150+', label: 'Expert Doctors' },
  { value: '30+', label: 'Years of Service' },
  { value: '98%', label: 'Satisfaction Rate' },
]

const testimonials = [
  { name: 'Emily Watson', review: 'The care I received at MediCare was exceptional. The doctors were thorough, kind, and genuinely invested in my recovery.', role: 'Cardiac Patient' },
  { name: 'David Okafor', review: 'From check-in to discharge, everything was smooth and professional. The staff made a stressful time feel manageable.', role: 'Orthopedic Patient' },
  { name: 'Priya Mehta', review: 'Dr. Rahman and her team were wonderful with my daughter. I felt completely at ease throughout the entire visit.', role: 'Parent / Pediatrics' },
]

const Home = () => {
  return (
    <Layout>

      {/* ── Hero ── */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center bg-linear-to-br from-slate-50 via-blue-50/40 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Trusted Healthcare Since 1995
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Your Health,{' '}
              <span className="text-blue-700">Our Highest</span>{' '}
              Priority
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              World-class medical expertise combined with compassionate patient care. We're here for you every step of the way — from prevention to recovery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/appointment"
                className="px-7 py-3.5 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-200"
              >
                Book Appointment
              </Link>
              <Link
                to="/services"
                className="px-7 py-3.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                Our Services
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {['ISO Certified', 'NABH Accredited', 'JCI Certified'].map(badge => (
                <div key={badge} className="flex items-center gap-2 text-sm text-slate-500">
                  <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="relative hidden lg:block">
            <div className="w-full aspect-square max-w-md mx-auto bg-linear-to-br from-blue-700 to-blue-900 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 relative overflow-hidden">
              <div className="absolute top-6 right-6 w-24 h-24 bg-white/10 rounded-2xl"></div>
              <div className="absolute bottom-8 left-6 w-16 h-16 bg-teal-400/20 rounded-xl"></div>
              <div className="relative z-10 text-center text-white px-8">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold">25,000+</p>
                <p className="text-blue-200 text-sm mt-1">Patients Served</p>
              </div>
            </div>
            <div className="absolute -left-8 top-16 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">150+ Doctors</p>
                <p className="text-xs text-slate-400">Specialists on call</p>
              </div>
            </div>
            <div className="absolute -right-6 bottom-20 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">24/7 Available</p>
                <p className="text-xs text-slate-400">Emergency care</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Preview ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">What We Offer</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">Our Medical Services</h2>
            </div>
            <Link to="/services" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
              View all services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map(service => (
              <div key={service.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
                <Link to="/services" className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900">
              View all services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Doctors Preview ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">Medical Experts</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">Meet Our Doctors</h2>
            </div>
            <Link to="/doctors" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
              Meet all doctors
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.slice(0, 4).map(doc => (
              <div key={doc.name} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:shadow-lg transition-shadow group">
                <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-xl font-bold text-white">{doc.initials}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{doc.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-1">{doc.specialty}</p>
                <p className="text-xs text-slate-400">{doc.experience} experience</p>
                <div className="mt-3 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Appointment CTA Banner ── */}
      <section className="py-20 bg-linear-to-r from-blue-800 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Schedule a Visit?</h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            Book an appointment online in minutes and get connected with the right specialist.
          </p>
          <Link
            to="/appointment"
            className="inline-block px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-xl text-sm"
          >
            Book Appointment Now
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">Testimonials</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">What Patients Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{t.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default Home
