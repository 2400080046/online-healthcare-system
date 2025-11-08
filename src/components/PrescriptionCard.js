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
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  MoreVert,
  Assignment,
  CalendarToday
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const PrescriptionCard = ({ prescription, onAction, showActions = true }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    onAction && onAction(prescription.id, action);
    handleMenuClose();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      completed: 'success',
      cancelled: 'error'
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
                  <Assignment />
                </Avatar>
                <Box>
                  <Typography variant="h6" component="div">
                    Prescription #{prescription.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prescription.doctorName && `Dr. ${prescription.doctorName}`}
                    {prescription.patientName && ` - Patient: ${prescription.patientName}`}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CalendarToday fontSize="small" color="action" />
                <Typography variant="body2">
                  {formatDate(prescription.date)}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                Medications:
              </Typography>
              <List dense>
                {prescription.medications?.map((med, index) => (
                  <ListItem key={index} sx={{ pl: 0 }}>
                    <ListItemText
                      primary={med.name}
                      secondary={`${med.dosage} - ${med.frequency} - ${med.duration}`}
                    />
                  </ListItem>
                ))}
              </List>

              {prescription.notes && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Notes:</strong> {prescription.notes}
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
              <Chip
                label={prescription.status?.toUpperCase() || 'PENDING'}
                color={getStatusColor(prescription.status)}
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
                    {prescription.status === 'pending' && (
                      <MenuItem onClick={() => handleAction('complete')}>Mark Complete</MenuItem>
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

export default PrescriptionCard;
