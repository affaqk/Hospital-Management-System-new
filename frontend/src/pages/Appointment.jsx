import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { CalendarDays, LogIn, UserPlus } from 'lucide-react'

const Appointment = () => {
  return (
    <Layout>
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

      <section className="py-24 bg-slate-50">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <CalendarDays size={30} className="text-blue-700" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Sign in to Book</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Appointments are managed through your patient dashboard. Log in or create a patient account to book, view, and manage your appointments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/patient-login"
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors"
              >
                <LogIn size={16} /> Sign In
              </Link>
              <Link
                to="/patient-signup"
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                <UserPlus size={16} /> Create Account
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '📞', title: 'Phone Booking', desc: 'Call +1 (800) 123-4567 between 8AM–8PM' },
              { icon: '🕐', title: 'Same-Day', desc: 'Available for urgent cases — call early' },
              { icon: '✅', title: 'Confirmation', desc: 'SMS & email confirmation sent instantly' },
            ].map(card => (
              <div key={card.title} className="bg-white rounded-xl p-5 border border-slate-100 flex items-start gap-3 text-left">
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
