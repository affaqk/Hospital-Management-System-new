import { useEffect, useState } from 'react'
import { User, Phone, Mail, HeartPulse, Calendar, Clock } from 'lucide-react'
import axios from 'axios'

export default function PatientProfile() {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  const getPatientProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/patients/profile", {
        withCredentials: true
      })
      setPatient(response.data.patient)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPatientProfile()
  }, [])

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        Failed to load profile.
      </div>
    )
  }

  const initials = patient.name
    .trim()
    .split(' ')
    .map(w => w[0].toUpperCase())
    .slice(0, 2)
    .join('')

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Hero card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-28 bg-gradient-to-r from-violet-600 to-violet-400" />
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-violet-600">{initials}</span>
            </div>
            <div className="flex-1 pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                <span className="self-start px-3 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600">
                  {patient.bloodGroup}
                </span>
              </div>
              <p className="text-violet-600 font-medium mt-0.5 capitalize">{patient.disease}</p>
              <p className="text-gray-400 text-sm mt-0.5 capitalize">{patient.role}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Personal info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
            <User size={15} className="text-violet-500" /> Personal Information
          </h2>
          <InfoRow icon={<User size={16} />} label="Full Name" value={patient.name} color="violet" />
          <InfoRow icon={<User size={16} />} label="Age" value={`${patient.age} years`} color="violet" />
          <InfoRow icon={<User size={16} />} label="Gender" value={patient.gender} color="violet" />
          <InfoRow icon={<Mail size={16} />} label="Email" value={patient.email} color="violet" />
          <InfoRow icon={<Phone size={16} />} label="Phone" value={patient.phone} color="violet" />
        </div>

        {/* Medical info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-2">
            <HeartPulse size={15} className="text-red-500" /> Medical Information
          </h2>
          <InfoRow icon={<HeartPulse size={16} />} label="Blood Group" value={patient.bloodGroup} color="red" />
          <InfoRow icon={<HeartPulse size={16} />} label="Disease / Condition" value={patient.disease} color="red" capitalize />
        </div>

      </div>

      {/* Account info */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-5">Account Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <InfoRow icon={<Calendar size={16} />} label="Member Since" value={formatDate(patient.createdAt)} color="violet" />
          <InfoRow icon={<Clock size={16} />} label="Last Updated" value={formatDate(patient.updatedAt)} color="violet" />
          <InfoRow icon={<User size={16} />} label="Account ID" value={patient._id} color="violet" mono />
        </div>
      </div>

    </div>
  )
}

function InfoRow({ icon, label, value, color = 'violet', mono, capitalize }) {
  const colorMap = {
    violet: 'bg-violet-50 text-violet-500',
    red: 'bg-red-50 text-red-500',
  }
  return (
    <div className="flex items-start gap-3">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
        <p className={`text-sm font-medium text-gray-800 ${mono ? 'font-mono text-xs break-all' : ''} ${capitalize ? 'capitalize' : ''}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
