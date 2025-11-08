import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AdminDashboard from './AdminDashboard';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';
import PharmacyDashboard from './PharmacyDashboard';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getUserRole } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const role = getUserRole();

  switch (role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'pharmacist':
      return <PharmacyDashboard />;
    default:
      return null;
  }
};

export default Dashboard;
