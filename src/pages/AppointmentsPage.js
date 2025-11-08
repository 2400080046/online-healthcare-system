import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AppointmentCard from '../components/AppointmentCard';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const schema = yup.object({
  doctorId: yup.number().required('Please select a doctor'),
  date: yup.string().required('Date is required'),
  time: yup.string().required('Time is required'),
  notes: yup.string()
});

const AppointmentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { doctors, appointments, loading, error, createAppointment, updateAppointment } = useData();
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [success, setSuccess] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setSuccess(null);
    const selectedDoctor = doctors.find(d => d.id === parseInt(data.doctorId));
    const appointmentData = {
      patientId: user.id,
      patientName: user.name,
      doctorId: parseInt(data.doctorId),
      doctorName: selectedDoctor?.name || '',
      date: data.date,
      time: data.time,
      notes: data.notes || '',
      type: 'consultation'
    };

    const result = await createAppointment(appointmentData);
    if (result.success) {
      setSuccess('Appointment booked successfully!');
      reset();
    }
  };

  const handleAppointmentAction = async (id, action) => {
    if (action === 'confirm') {
      await updateAppointment(id, { status: 'confirmed' });
    } else if (action === 'cancel') {
      await updateAppointment(id, { status: 'cancelled' });
    }
  };

  const selectedDoctorId = watch('doctorId');
  const selectedDoctor = doctors.find(d => d.id === parseInt(selectedDoctorId));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        darkMode={darkMode}
        onThemeToggle={toggleTheme}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Book Appointment
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Book New Appointment
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <FormControl fullWidth margin="normal" required>
                    <InputLabel id="doctor-label">Select Doctor</InputLabel>
                    <Select
                      labelId="doctor-label"
                      id="doctorId"
                      label="Select Doctor"
                      {...register('doctorId')}
                      error={!!errors.doctorId}
                    >
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.id} value={doctor.id}>
                          {doctor.name} - {doctor.specialization}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.doctorId && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                        {errors.doctorId.message}
                      </Typography>
                    )}
                  </FormControl>

                  {selectedDoctor && (
                    <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Available Slots: {selectedDoctor.availableSlots.join(', ')}
                      </Typography>
                    </Box>
                  )}

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="date"
                    label="Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    {...register('date')}
                    error={!!errors.date}
                    helperText={errors.date?.message}
                  />

                  <FormControl fullWidth margin="normal" required>
                    <InputLabel id="time-label">Time</InputLabel>
                    <Select
                      labelId="time-label"
                      id="time"
                      label="Time"
                      {...register('time')}
                      error={!!errors.time}
                    >
                      {selectedDoctor?.availableSlots.map((slot) => (
                        <MenuItem key={slot} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.time && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                        {errors.time.message}
                      </Typography>
                    )}
                  </FormControl>

                  <TextField
                    margin="normal"
                    fullWidth
                    id="notes"
                    label="Notes (Optional)"
                    multiline
                    rows={3}
                    {...register('notes')}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Book Appointment'}
                  </Button>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  My Appointments
                </Typography>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onAction={handleAppointmentAction}
                      showActions={true}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No appointments found
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AppointmentsPage;

