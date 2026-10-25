import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { services } from '../data/services'

const Services = () => {
  return (
    <Layout>

      {/* ── Page Banner ── */}
      <section className="bg-linear-to-br from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/15 text-blue-100 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
            Our Services
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Comprehensive Medical Care
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            From routine check-ups to complex surgeries, we offer a full spectrum of healthcare services.
          </p>
          <div className="mt-6 flex justify-center gap-2 text-sm text-blue-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Services</span>
          </div>
        </div>
      </section>

      {/* ── All Services ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div
                key={service.title}
                className="bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.color}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3">{service.description}</p>
                <p className="text-sm text-slate-400 leading-relaxed border-t border-slate-100 pt-3">
                  {service.detail}
                </p>
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-1.5 mt-5 px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Book Consultation
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Emergency CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Medical Emergency?</h3>
                <p className="text-sm text-slate-500">Our emergency team is available 24/7. Call us immediately.</p>
              </div>
            </div>
            <a
              href="tel:+18001234567"
              className="shrink-0 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm"
            >
              Call Emergency
            </a>
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default Services
