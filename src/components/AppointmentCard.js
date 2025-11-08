import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import {
  MoreVert,
  CalendarToday,
  AccessTime,
  LocalHospital
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const AppointmentCard = ({ appointment, onAction, showActions = true }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    onAction && onAction(appointment.id, action);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'error',
      completed: 'info'
    };
    return colors[status] || 'default';
  };

  const formatDate = (dateStr) => {
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy');
    } catch {
      return dateStr || 'N/A';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          mb: 2,
          '&:hover': {
            boxShadow: 4,
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease'
          }
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <LocalHospital />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="div">
                    {appointment.doctorName || appointment.patientName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {appointment.patientName && appointment.doctorName 
                      ? `Patient: ${appointment.patientName}` 
                      : appointment.type || 'Consultation'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday fontSize="small" color="action" />
                  <Typography variant="body2">
                    {formatDate(appointment.date)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2">{appointment.time || 'N/A'}</Typography>
                </Box>
                {appointment.notes && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {appointment.notes}
                  </Typography>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Chip
                label={appointment.status?.toUpperCase() || 'PENDING'}
                color={getStatusColor(appointment.status)}
                size="small"
              />
              {showActions && (
                <>
                  <IconButton
                    size="small"
                    onClick={handleMenuOpen}
                    aria-label="more options"
                  >
                    <MoreVert />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleAction('view')}>View Details</MenuItem>
                    <MenuItem onClick={() => handleAction('edit')}>Edit</MenuItem>
                    {appointment.status === 'pending' && (
                      <MenuItem onClick={() => handleAction('confirm')}>Confirm</MenuItem>
                    )}
                    {appointment.status !== 'cancelled' && (
                      <MenuItem onClick={() => handleAction('cancel')}>Cancel</MenuItem>
                    )}
                  </Menu>
                </>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AppointmentCard;
