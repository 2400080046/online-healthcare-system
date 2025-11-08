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
  Button,
  Chip
} from '@mui/material';
import {
  LocalPharmacy,
  Assignment,
  CheckCircle,
  Pending,
  AttachMoney
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useData } from '../hooks/useData';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

const PharmacyDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { stats, pharmacyOrders, loading, error, updateOrderStatus } = useData();
  const { user } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const handleOrderAction = async (id, status) => {
    await updateOrderStatus(id, status);
  };

  const recentOrders = pharmacyOrders && pharmacyOrders.length > 0 ? pharmacyOrders.slice(0, 5) : [];

  const chartData = [
    { name: 'Jan', orders: 45, revenue: 1200 },
    { name: 'Feb', orders: 52, revenue: 1500 },
    { name: 'Mar', orders: 48, revenue: 1400 },
    { name: 'Apr', orders: 61, revenue: 1800 },
    { name: 'May', orders: 55, revenue: 1600 },
    { name: 'Jun', orders: 58, revenue: 1700 }
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
                {typeof value === 'number' && title.includes('Revenue') 
                  ? `$${value.toFixed(2)}` 
                  : value || 0}
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
            Pharmacy Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Welcome back, {user?.name}!
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {loading && !stats && !pharmacyOrders ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Total Orders"
                    value={stats?.totalOrders ?? (pharmacyOrders?.length || 0)}
                    icon={<LocalPharmacy />}
                    color="primary.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Pending Orders"
                    value={stats?.pendingOrders ?? (pharmacyOrders?.filter(o => o.status === 'pending').length || 0)}
                    icon={<Pending />}
                    color="warning.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Completed"
                    value={stats?.completedOrders ?? (pharmacyOrders?.filter(o => o.status === 'completed').length || 0)}
                    icon={<CheckCircle />}
                    color="success.main"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <StatCard
                    title="Total Revenue"
                    value={stats?.totalRevenue ?? (pharmacyOrders?.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalAmount, 0) || 0)}
                    icon={<AttachMoney />}
                    color="info.main"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Orders & Revenue Overview
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="orders" fill="#8884d8" name="Orders" />
                        <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue ($)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Recent Orders
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => navigate('/pharmacy/orders')}
                      >
                        View All
                      </Button>
                    </Box>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order) => (
                        <Card key={order.id} sx={{ mb: 2 }}>
                          <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Order #{order.id}
                              </Typography>
                              <Chip
                                label={order.status}
                                color={order.status === 'completed' ? 'success' : 'warning'}
                                size="small"
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Patient: {order.patientName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Date: {order.orderDate}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" sx={{ mt: 1 }}>
                              Total: ${order.totalAmount}
                            </Typography>
                            {order.status === 'pending' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                sx={{ mt: 1 }}
                                onClick={() => handleOrderAction(order.id, 'completed')}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No recent orders
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

export default PharmacyDashboard;
