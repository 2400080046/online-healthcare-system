// API utility functions for fetching mock data
import {
  mockUsers,
  mockDoctors,
  mockAppointments,
  mockPrescriptions,
  mockPatients,
  mockPharmacyOrders
} from './mockData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to ensure userId is a number
const ensureNumber = (value) => {
  if (typeof value === 'string') {
    return parseInt(value, 10);
  }
  return value;
};

// Authentication API
export const authAPI = {
  login: async (email, password) => {
    await delay(800);
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid credentials' };
  },

  register: async (userData) => {
    await delay(800);
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      avatar: userData.name.split(' ').map(n => n[0]).join('')
    };
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return { success: true, user: userWithoutPassword };
  }
};

// Doctors API
export const doctorsAPI = {
  getAll: async () => {
    await delay(600);
    return { success: true, data: mockDoctors };
  },

  getById: async (id) => {
    await delay(400);
    const doctor = mockDoctors.find(d => d.id === id);
    return { success: !!doctor, data: doctor };
  }
};

// Appointments API
export const appointmentsAPI = {
  getAll: async (userId, role) => {
    await delay(600);
    let filteredAppointments = [...mockAppointments];
    const userIdNum = ensureNumber(userId);
    
    if (role === 'doctor') {
      filteredAppointments = mockAppointments.filter(apt => apt.doctorId === userIdNum);
    } else if (role === 'patient') {
      filteredAppointments = mockAppointments.filter(apt => apt.patientId === userIdNum);
    }
    
    return { success: true, data: filteredAppointments };
  },

  create: async (appointmentData) => {
    await delay(500);
    const newAppointment = {
      id: mockAppointments.length + 1,
      ...appointmentData,
      status: 'pending'
    };
    mockAppointments.push(newAppointment);
    return { success: true, data: newAppointment };
  },

  update: async (id, updates) => {
    await delay(400);
    const index = mockAppointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      mockAppointments[index] = { ...mockAppointments[index], ...updates };
      return { success: true, data: mockAppointments[index] };
    }
    return { success: false, error: 'Appointment not found' };
  }
};

// Prescriptions API
export const prescriptionsAPI = {
  getAll: async (userId, role) => {
    await delay(600);
    let filteredPrescriptions = [...mockPrescriptions];
    const userIdNum = ensureNumber(userId);
    
    if (role === 'doctor') {
      filteredPrescriptions = mockPrescriptions.filter(pr => pr.doctorId === userIdNum);
    } else if (role === 'patient') {
      filteredPrescriptions = mockPrescriptions.filter(pr => pr.patientId === userIdNum);
    }
    
    return { success: true, data: filteredPrescriptions };
  },

  create: async (prescriptionData) => {
    await delay(500);
    const newPrescription = {
      id: mockPrescriptions.length + 1,
      ...prescriptionData,
      status: 'pending'
    };
    mockPrescriptions.push(newPrescription);
    return { success: true, data: newPrescription };
  },

  update: async (id, updates) => {
    await delay(400);
    const index = mockPrescriptions.findIndex(pr => pr.id === id);
    if (index !== -1) {
      mockPrescriptions[index] = { ...mockPrescriptions[index], ...updates };
      return { success: true, data: mockPrescriptions[index] };
    }
    return { success: false, error: 'Prescription not found' };
  }
};

// Patients API
export const patientsAPI = {
  getAll: async () => {
    await delay(600);
    return { success: true, data: mockPatients };
  },

  getById: async (id) => {
    await delay(400);
    const patient = mockPatients.find(p => p.id === id);
    return { success: !!patient, data: patient };
  }
};

// Pharmacy API
export const pharmacyAPI = {
  getAllOrders: async () => {
    await delay(600);
    return { success: true, data: mockPharmacyOrders };
  },

  updateOrderStatus: async (id, status) => {
    await delay(400);
    const index = mockPharmacyOrders.findIndex(order => order.id === id);
    if (index !== -1) {
      mockPharmacyOrders[index].status = status;
      return { success: true, data: mockPharmacyOrders[index] };
    }
    return { success: false, error: 'Order not found' };
  }
};

// Statistics API
export const statsAPI = {
  getDashboardStats: async (role, userId) => {
    await delay(500);
    const userIdNum = ensureNumber(userId);
    const today = new Date().toISOString().split('T')[0];
    
    if (role === 'admin') {
      return {
        success: true,
        data: {
          totalUsers: mockUsers.length,
          totalAppointments: mockAppointments.length,
          totalPrescriptions: mockPrescriptions.length,
          pendingOrders: mockPharmacyOrders.filter(o => o.status === 'pending').length
        }
      };
    } else if (role === 'doctor') {
      const doctorAppointments = mockAppointments.filter(apt => apt.doctorId === userIdNum);
      return {
        success: true,
        data: {
          totalAppointments: doctorAppointments.length,
          todayAppointments: doctorAppointments.filter(apt => apt.date === today).length,
          totalPrescriptions: mockPrescriptions.filter(pr => pr.doctorId === userIdNum).length,
          confirmedAppointments: doctorAppointments.filter(apt => apt.status === 'confirmed').length
        }
      };
    } else if (role === 'patient') {
      const patientAppointments = mockAppointments.filter(apt => apt.patientId === userIdNum);
      return {
        success: true,
        data: {
          totalAppointments: patientAppointments.length,
          upcomingAppointments: patientAppointments.filter(apt => apt.status === 'confirmed' || apt.status === 'pending').length,
          totalPrescriptions: mockPrescriptions.filter(pr => pr.patientId === userIdNum).length,
          completedAppointments: patientAppointments.filter(apt => apt.status === 'completed').length
        }
      };
    } else if (role === 'pharmacist') {
      return {
        success: true,
        data: {
          totalOrders: mockPharmacyOrders.length,
          pendingOrders: mockPharmacyOrders.filter(o => o.status === 'pending').length,
          completedOrders: mockPharmacyOrders.filter(o => o.status === 'completed').length,
          totalRevenue: mockPharmacyOrders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalAmount, 0)
        }
      };
    }
    
    return { success: false, error: 'Invalid role' };
  }
};

export default { authAPI, doctorsAPI, appointmentsAPI, prescriptionsAPI, patientsAPI, pharmacyAPI, statsAPI };
