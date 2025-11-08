import React, { useState } from 'react';
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
  People,
  Assignment,
  CheckCircle
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AppointmentCard from '../components/AppointmentCard';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const DoctorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { stats, appointments, loading, error, updateAppointment } = useData();
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const handleAppointmentAction = async (id, action) => {
    if (action === 'confirm') {
      await updateAppointment(id, { status: 'confirmed' });
    } else if (action === 'cancel') {
      await updateAppointment(id, { status: 'cancelled' });
    }
  };

  const recentAppointments = appointments && appointments.length > 0 ? appointments.slice(0, 3) : [];

  const chartData = [
    { name: 'Mon', appointments: 4 },
    { name: 'Tue', appointments: 3 },
    { name: 'Wed', appointments: 5 },
    { name: 'Thu', appointments: 2 },
    { name: 'Fri', appointments: 6 },
    { name: 'Sat', appointments: 1 },
    { name: 'Sun', appointments: 0 }
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
            Doctor Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back, {user?.name}!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading && !stats && !appointments ? (
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
                    title="Today's Appointments"
                    value={stats?.todayAppointments ?? 0}
                    icon={<CheckCircle />}
                    color="success.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Prescriptions"
                    value={stats?.totalPrescriptions ?? 0}
                    icon={<Assignment />}
                    color="warning.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Confirmed"
                    value={stats?.confirmedAppointments ?? (appointments?.filter(apt => apt.status === 'confirmed').length || 0)}
                    icon={<People />}
                    color="info.main"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Weekly Appointments
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="appointments" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Recent Appointments
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => navigate('/doctor/appointments')}
                      >
                        View All
                      </Button>
                    </Box>
                    {recentAppointments.length > 0 ? (
                      recentAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onAction={handleAppointmentAction}
                          showActions={true}
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
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
