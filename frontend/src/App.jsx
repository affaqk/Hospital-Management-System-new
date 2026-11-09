import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import Contact from './pages/Contact'

import PatientSignup from './pages/patient/auth/PatientSignup'
import PatientLogin from './pages/patient/auth/PatientLogin'
import PatientDashboard from './pages/patient/dashboard/PatientDashboard'
import PatientOverview from './pages/patient/dashboard/PatientOverview'
import PatientAppointments from './pages/patient/dashboard/PatientAppointments'
import PatientProfile from './pages/patient/dashboard/PatientProfile'

import DoctorSignup from './pages/doctor/auth/DoctorSignup'
import DoctorLogin from './pages/doctor/auth/DoctorLogin'
import DoctorDashboard from './pages/doctor/dashboard/DoctorDashboard'
import DoctorOverview from './pages/doctor/dashboard/DoctorOverview'
import DoctorPatients from './pages/doctor/dashboard/DoctorPatients'
import DoctorAppointmentDetails from './pages/doctor/dashboard/DoctorAppointmentDetails'
import DoctorProfile from './pages/doctor/dashboard/DoctorProfile'

import AdminSignup from './pages/admin/auth/AdminSignup'
import AdminLogin from './pages/admin/auth/AdminLogin'
import AdminDashboard from './pages/admin/dashboard/AdminDashboard'
import AdminOverview from './pages/admin/dashboard/AdminOverview'
import AdminDoctors from './pages/admin/dashboard/AdminDoctors'
import AdminPatients from './pages/admin/dashboard/AdminPatients'
import AdminAppointments from './pages/admin/dashboard/AdminAppointments'
import AdminProfile from './pages/admin/dashboard/AdminProfile'

import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/patient-signup" element={<PatientSignup />} />
        <Route path="/patient-login" element={<PatientLogin />} />

        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRole="patient" redirectTo="/patient-login">
              <PatientDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<PatientOverview />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="profile" element={<PatientProfile />} />
        </Route>

        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />

        <Route
          path="/doctor/dashboard/profile"
          element={
            <ProtectedRoute allowedRole="doctor" redirectTo="/doctor-login">
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRole="doctor" redirectTo="/doctor-login">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorOverview />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="appointments" element={<DoctorAppointmentDetails />} />
        </Route>

        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard/profile"
          element={
            <ProtectedRoute allowedRole="admin" redirectTo="/admin-login">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRole="admin" redirectTo="/admin-login">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="appointments" element={<AdminAppointments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
