import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const values = [
  { title: 'Expert Medical Team', desc: 'Board-certified physicians with decades of combined experience across all specialties.', icon: '🩺' },
  { title: 'Advanced Technology', desc: 'Equipped with the latest diagnostic tools and minimally invasive treatment options.', icon: '🔬' },
  { title: 'Patient-Centered Care', desc: 'Personalized treatment plans designed around your unique health needs and goals.', icon: '🤝' },
  { title: 'Transparent Pricing', desc: 'Clear, upfront costs with no hidden fees and flexible insurance options.', icon: '💳' },
]

const milestones = [
  { year: '1995', event: 'MediCare Hospital founded with a vision to deliver world-class healthcare.' },
  { year: '2003', event: 'Expanded to a 300-bed facility with 8 specialized departments.' },
  { year: '2011', event: 'Received NABH accreditation for excellence in patient safety.' },
  { year: '2018', event: 'Launched 24/7 telemedicine and online appointment system.' },
  { year: '2023', event: 'Opened the new Robotic Surgery and Advanced Diagnostics Centre.' },
]

const About = () => {
  return (
    <Layout>

      {/* ── Page Banner ── */}
      <section className="bg-linear-to-br from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 bg-white/15 text-blue-100 text-xs font-semibold rounded-full mb-4 uppercase tracking-widest">
            About Us
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Caring for People Since 1995
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Three decades of dedicated service, compassionate care, and medical excellence.
          </p>
          <div className="mt-6 flex justify-center gap-2 text-sm text-blue-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">Our Mission</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-6">Healthcare You Can Trust</h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              At MediCare, we believe every person deserves access to exceptional healthcare. We blend cutting-edge technology with a genuine human touch, ensuring that every patient feels seen, heard, and cared for.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Our team of over 150 specialists works tirelessly to deliver the most accurate diagnoses and effective treatments — all within a compassionate, patient-first environment.
            </p>
            <Link
              to="/appointment"
              className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-md"
            >
              Book a Consultation
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Modern Facilities', icon: '🏥', bg: 'bg-blue-50' },
              { label: '24/7 Support', icon: '📞', bg: 'bg-teal-50' },
              { label: 'Online Booking', icon: '📅', bg: 'bg-violet-50' },
              { label: 'Lab Reports Online', icon: '🔬', bg: 'bg-amber-50' },
            ].map(card => (
              <div key={card.label} className={`${card.bg} rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-square`}>
                <span className="text-4xl mb-3">{card.icon}</span>
                <p className="font-semibold text-slate-700 text-sm">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">Why MediCare</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-4">What Sets Us Apart</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We are committed to delivering care that goes beyond treatment — focusing on your overall well-being.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow text-center">
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="font-semibold text-slate-800 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-700 text-sm font-semibold uppercase tracking-widest">Our Journey</span>
            <h2 className="text-4xl font-bold text-slate-900 mt-2">Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-blue-100"></div>
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md">
                    <span className="w-2.5 h-2.5 bg-white rounded-full"></span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 flex-1 border border-slate-100">
                    <span className="text-blue-700 text-sm font-bold">{m.year}</span>
                    <p className="text-slate-700 text-sm mt-1 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '25,000+', label: 'Patients Treated' },
              { value: '150+', label: 'Expert Doctors' },
              { value: '30+', label: 'Years of Service' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-blue-200 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </Layout>
  )
}

export default About
