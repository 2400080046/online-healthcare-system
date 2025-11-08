import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import {
  CalendarToday,
  Assignment,
  CheckCircle,
  Schedule
} from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AppointmentCard from '../components/AppointmentCard';
import PrescriptionCard from '../components/PrescriptionCard';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const PatientDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { stats, appointments, prescriptions, loading, error } = useData();
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const recentAppointments = appointments && appointments.length > 0 ? appointments.slice(0, 2) : [];
  const recentPrescriptions = prescriptions && prescriptions.length > 0 ? prescriptions.slice(0, 2) : [];

  const chartData = [
    { name: 'Jan', visits: 2 },
    { name: 'Feb', visits: 3 },
    { name: 'Mar', visits: 1 },
    { name: 'Apr', visits: 4 },
    { name: 'May', visits: 2 },
    { name: 'Jun', visits: 3 }
  ];

  const StatCard = ({ title, value, icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" gutterBottom variant="h6">
                {title}
              </Typography>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {value || 0}
              </Typography>
            </Box>
            <Box sx={{ color: color || 'primary.main', fontSize: 48 }}>
              {icon}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        darkMode={darkMode}
        onThemeToggle={toggleTheme}
      />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
        <Container maxWidth="xl" sx={{ width: '100%' }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
            Patient Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back, {user?.name}!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading && !stats && !appointments && !prescriptions ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Total Appointments"
                    value={stats?.totalAppointments ?? (appointments?.length || 0)}
                    icon={<CalendarToday />}
                    color="primary.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Upcoming"
                    value={stats?.upcomingAppointments ?? (appointments?.filter(apt => apt.status === 'confirmed' || apt.status === 'pending').length || 0)}
                    icon={<Schedule />}
                    color="success.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Prescriptions"
                    value={stats?.totalPrescriptions ?? (prescriptions?.length || 0)}
                    icon={<Assignment />}
                    color="warning.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Completed"
                    value={stats?.completedAppointments ?? (appointments?.filter(apt => apt.status === 'completed').length || 0)}
                    icon={<CheckCircle />}
                    color="info.main"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Medical Visits History
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Recent Appointments
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => navigate('/patient/appointments')}
                      >
                        View All
                      </Button>
                    </Box>
                    {recentAppointments.length > 0 ? (
                      recentAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          showActions={false}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No recent appointments
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Recent Prescriptions
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => navigate('/patient/prescriptions')}
                      >
                        View All
                      </Button>
                    </Box>
                    {recentPrescriptions.length > 0 ? (
                      recentPrescriptions.map((prescription) => (
                        <PrescriptionCard
                          key={prescription.id}
                          prescription={prescription}
                          showActions={false}
                        />
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No recent prescriptions
                      </Typography>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default PatientDashboard;
