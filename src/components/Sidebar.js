import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography
} from '@mui/material';
import {
  Dashboard,
  CalendarToday,
  LocalPharmacy,
  People,
  Assignment,
  Settings,
  Home
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

const drawerWidth = 240;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getUserRole } = useAuth();
  const role = getUserRole();

  const menuItems = {
    admin: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { text: 'Users', icon: <People />, path: '/admin/users' },
      { text: 'Appointments', icon: <CalendarToday />, path: '/admin/appointments' },
      { text: 'Prescriptions', icon: <Assignment />, path: '/admin/prescriptions' },
      { text: 'Pharmacy Orders', icon: <LocalPharmacy />, path: '/admin/pharmacy' },
      { text: 'Settings', icon: <Settings />, path: '/admin/settings' }
    ],
    doctor: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { text: 'Appointments', icon: <CalendarToday />, path: '/doctor/appointments' },
      { text: 'Patients', icon: <People />, path: '/doctor/patients' },
      { text: 'Prescriptions', icon: <Assignment />, path: '/doctor/prescriptions' }
    ],
    patient: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { text: 'Book Appointment', icon: <CalendarToday />, path: '/patient/appointments' },
      { text: 'My Prescriptions', icon: <Assignment />, path: '/patient/prescriptions' },
      { text: 'Medical History', icon: <Home />, path: '/patient/history' }
    ],
    pharmacist: [
      { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
      { text: 'Orders', icon: <LocalPharmacy />, path: '/pharmacy/orders' },
      { text: 'Prescriptions', icon: <Assignment />, path: '/pharmacy/prescriptions' }
    ]
  };

  const items = menuItems[role] || [];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 960) {
      onClose();
    }
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box sx={{ width: drawerWidth, pt: 2 }}>
        <Typography variant="h6" sx={{ px: 2, mb: 1, fontWeight: 'bold' }}>
          Menu
        </Typography>
        <Divider />
        <List>
          {items.map((item) => (
            <motion.div
              key={item.text}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  selected={location.pathname === item.path}
                  onClick={() => handleNavigation(item.path)}
                >
                  <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
