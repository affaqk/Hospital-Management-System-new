import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { doctors } from '../data/doctors'

const departments = ['All', ...new Set(doctors.map(d => d.department))]

const Doctors = () => {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? doctors : doctors.filter(d => d.department === active)

  return (
    <Layout>

      {/* ── Page Banner ── */}
      <section className="bg-linear-to-br from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/15 text-blue-100 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
            Medical Team
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Meet Our Specialist Doctors
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Our team of dedicated physicians brings expertise, compassion, and decades of experience to every patient.
          </p>
          <div className="mt-6 flex justify-center gap-2 text-sm text-blue-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Doctors</span>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="py-10 bg-white border-b border-slate-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setActive(dept)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === dept
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Doctor Cards ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(doc => (
              <div key={doc.name} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl font-bold text-white">{doc.initials}</span>
                </div>
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{doc.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{doc.specialty}</p>
                  <p className="text-xs text-slate-400 mt-1">{doc.department}</p>
                </div>
                <div className="border-t border-slate-100 pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    {doc.education}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {doc.experience} experience
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-3">{doc.bio}</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <svg key={s} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <Link
                  to="/appointment"
                  className="block mt-4 text-center py-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default Doctors
