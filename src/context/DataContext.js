import React, { createContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  doctorsAPI,
  appointmentsAPI,
  prescriptionsAPI,
  patientsAPI,
  pharmacyAPI,
  statsAPI
} from '../utils/api';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [pharmacyOrders, setPharmacyOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const response = await doctorsAPI.getAll();
      if (response.success) {
        setDoctors(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch doctors:', err);
    }
  };

  const fetchAppointments = async () => {
    if (!user) return;
    
    try {
      const response = await appointmentsAPI.getAll(user.id, user.role);
      if (response.success) {
        setAppointments(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch appointments:', err);
    }
  };

  const fetchPrescriptions = async () => {
    if (!user) return;
    
    try {
      const response = await prescriptionsAPI.getAll(user.id, user.role);
      if (response.success) {
        setPrescriptions(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch prescriptions:', err);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await patientsAPI.getAll();
      if (response.success) {
        setPatients(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    }
  };

  const fetchPharmacyOrders = async () => {
    try {
      const response = await pharmacyAPI.getAllOrders();
      if (response.success) {
        setPharmacyOrders(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch pharmacy orders:', err);
    }
  };

  const fetchStats = async () => {
    if (!user) return;
    
    try {
      const response = await statsAPI.getDashboardStats(user.role, user.id);
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch statistics:', err);
    }
  };

  const createAppointment = async (appointmentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await appointmentsAPI.create(appointmentData);
      if (response.success) {
        await fetchAppointments();
        await fetchStats();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to create appointment');
      return { success: false, error: 'Failed to create appointment' };
    } finally {
      setLoading(false);
    }
  };

  const updateAppointment = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await appointmentsAPI.update(id, updates);
      if (response.success) {
        await fetchAppointments();
        await fetchStats();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to update appointment');
      return { success: false, error: 'Failed to update appointment' };
    } finally {
      setLoading(false);
    }
  };

  const createPrescription = async (prescriptionData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await prescriptionsAPI.create(prescriptionData);
      if (response.success) {
        await fetchPrescriptions();
        await fetchStats();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to create prescription');
      return { success: false, error: 'Failed to create prescription' };
    } finally {
      setLoading(false);
    }
  };

  const updatePrescription = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await prescriptionsAPI.update(id, updates);
      if (response.success) {
        await fetchPrescriptions();
        await fetchStats();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to update prescription');
      return { success: false, error: 'Failed to update prescription' };
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pharmacyAPI.updateOrderStatus(id, status);
      if (response.success) {
        await fetchPharmacyOrders();
        await fetchStats();
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      setError('Failed to update order status');
      return { success: false, error: 'Failed to update order status' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const promises = [
            fetchDoctors(),
            fetchAppointments(),
            fetchPrescriptions(),
            fetchStats()
          ];
          
          if (user.role === 'admin' || user.role === 'doctor') {
            promises.push(fetchPatients());
          }
          
          if (user.role === 'pharmacist' || user.role === 'admin') {
            promises.push(fetchPharmacyOrders());
          }
          
          await Promise.all(promises);
        } catch (err) {
          console.error('Error loading data:', err);
          setError('Failed to load data');
        } finally {
          setLoading(false);
        }
      };
      
      loadData();
    } else {
      setDoctors([]);
      setAppointments([]);
      setPrescriptions([]);
      setPatients([]);
      setPharmacyOrders([]);
      setStats(null);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const value = {
    doctors,
    appointments,
    prescriptions,
    patients,
    pharmacyOrders,
    stats,
    loading,
    error,
    fetchDoctors,
    fetchAppointments,
    fetchPrescriptions,
    fetchPatients,
    fetchPharmacyOrders,
    fetchStats,
    createAppointment,
    updateAppointment,
    createPrescription,
    updatePrescription,
    updateOrderStatus,
    setError
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
