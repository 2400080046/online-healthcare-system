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
  Alert
} from '@mui/material';
import {
  People,
  CalendarToday,
  Assignment,
  LocalPharmacy
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { stats, loading, error } = useData();
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const chartData = stats ? [
    { name: 'Users', value: stats.totalUsers || 0 },
    { name: 'Appointments', value: stats.totalAppointments || 0 },
    { name: 'Prescriptions', value: stats.totalPrescriptions || 0 },
    { name: 'Pending Orders', value: stats.pendingOrders || 0 }
  ] : [
    { name: 'Users', value: 0 },
    { name: 'Appointments', value: 0 },
    { name: 'Prescriptions', value: 0 },
    { name: 'Pending Orders', value: 0 }
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
            Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back, {user?.name}!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading && !stats ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Total Users"
                    value={stats?.totalUsers}
                    icon={<People />}
                    color="primary.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Appointments"
                    value={stats?.totalAppointments}
                    icon={<CalendarToday />}
                    color="success.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Prescriptions"
                    value={stats?.totalPrescriptions}
                    icon={<Assignment />}
                    color="warning.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Pending Orders"
                    value={stats?.pendingOrders}
                    icon={<LocalPharmacy />}
                    color="error.main"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      System Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Distribution
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
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

export default AdminDashboard;
