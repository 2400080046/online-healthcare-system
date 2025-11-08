// Mock data for the medical system

export const mockUsers = [
  {
    id: 1,
    email: 'admin@medical.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    avatar: 'A'
  },
  {
    id: 2,
    email: 'doctor@medical.com',
    password: 'doctor123',
    role: 'doctor',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    avatar: 'SJ'
  },
  {
    id: 3,
    email: 'patient@medical.com',
    password: 'patient123',
    role: 'patient',
    name: 'John Doe',
    age: 35,
    avatar: 'JD'
  },
  {
    id: 4,
    email: 'pharmacist@medical.com',
    password: 'pharmacist123',
    role: 'pharmacist',
    name: 'Emily Chen',
    pharmacyName: 'City Pharmacy',
    avatar: 'EC'
  }
];

export const mockDoctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    experience: 10,
    rating: 4.8,
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00']
  },
  {
    id: 2,
    name: 'Dr. Michael Brown',
    specialization: 'Dermatologist',
    experience: 8,
    rating: 4.6,
    availableSlots: ['09:00', '10:00', '14:00', '15:00', '16:00']
  },
  {
    id: 3,
    name: 'Dr. Lisa Anderson',
    specialization: 'Pediatrician',
    experience: 12,
    rating: 4.9,
    availableSlots: ['09:00', '10:00', '11:00', '12:00', '14:00']
  },
  {
    id: 4,
    name: 'Dr. Robert Wilson',
    specialization: 'Neurologist',
    experience: 15,
    rating: 4.7,
    availableSlots: ['10:00', '11:00', '14:00', '15:00', '16:00']
  }
];

// Get today's date and create dates relative to today
const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];

export const mockAppointments = [
  {
    id: 1,
    patientId: 3,
    patientName: 'John Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: todayStr,
    time: '10:00',
    status: 'confirmed',
    type: 'consultation',
    notes: 'Regular checkup'
  },
  {
    id: 2,
    patientId: 3,
    patientName: 'John Doe',
    doctorId: 2,
    doctorName: 'Dr. Michael Brown',
    date: tomorrowStr,
    time: '14:00',
    status: 'pending',
    type: 'consultation',
    notes: ''
  },
  {
    id: 3,
    patientId: 5,
    patientName: 'Jane Smith',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: todayStr,
    time: '11:00',
    status: 'confirmed',
    type: 'consultation',
    notes: 'Follow-up appointment'
  },
  {
    id: 4,
    patientId: 3,
    patientName: 'John Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: yesterdayStr,
    time: '15:00',
    status: 'completed',
    type: 'consultation',
    notes: 'Previous visit'
  }
];

export const mockPrescriptions = [
  {
    id: 1,
    patientId: 3,
    patientName: 'John Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: yesterdayStr,
    medications: [
      { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', duration: '7 days' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days' }
    ],
    status: 'pending',
    notes: 'Take with food'
  },
  {
    id: 2,
    patientId: 3,
    patientName: 'John Doe',
    doctorId: 2,
    doctorName: 'Dr. Michael Brown',
    date: yesterdayStr,
    medications: [
      { name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '5 days' }
    ],
    status: 'completed',
    notes: 'For allergy relief'
  },
  {
    id: 3,
    patientId: 5,
    patientName: 'Jane Smith',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    date: yesterdayStr,
    medications: [
      { name: 'Ibuprofen', dosage: '200mg', frequency: 'Twice daily', duration: '5 days' }
    ],
    status: 'pending',
    notes: 'Take after meals'
  }
];

export const mockPatients = [
  {
    id: 3,
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    email: 'patient@medical.com',
    phone: '+1234567890',
    medicalHistory: ['Hypertension', 'Type 2 Diabetes'],
    lastVisit: yesterdayStr
  },
  {
    id: 5,
    name: 'Jane Smith',
    age: 28,
    gender: 'Female',
    email: 'jane@example.com',
    phone: '+1234567891',
    medicalHistory: ['Asthma'],
    lastVisit: yesterdayStr
  }
];

export const mockPharmacyOrders = [
  {
    id: 1,
    prescriptionId: 1,
    patientName: 'John Doe',
    medications: [
      { name: 'Aspirin', quantity: 7 },
      { name: 'Metformin', quantity: 60 }
    ],
    status: 'pending',
    orderDate: yesterdayStr,
    totalAmount: 45.99
  },
  {
    id: 2,
    prescriptionId: 2,
    patientName: 'John Doe',
    medications: [
      { name: 'Cetirizine', quantity: 5 }
    ],
    status: 'completed',
    orderDate: yesterdayStr,
    totalAmount: 12.50
  },
  {
    id: 3,
    prescriptionId: 3,
    patientName: 'Jane Smith',
    medications: [
      { name: 'Ibuprofen', quantity: 10 }
    ],
    status: 'pending',
    orderDate: todayStr,
    totalAmount: 8.99
  }
];
