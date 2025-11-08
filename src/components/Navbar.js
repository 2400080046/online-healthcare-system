import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = ({ onMenuClick, darkMode, onThemeToggle }) => {
  const navigate = useNavigate();
  const { user, logout, getUserRole } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleClose();
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      admin: 'Admin',
      doctor: 'Doctor',
      patient: 'Patient',
      pharmacist: 'Pharmacist'
    };
    return roleMap[role] || 'User';
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          🏥 Medical System
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={onThemeToggle}
                icon={<Brightness7 />}
                checkedIcon={<Brightness4 />}
              />
            }
            label={darkMode ? 'Dark' : 'Light'}
            sx={{ color: 'white' }}
          />

          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {user.name} ({getRoleDisplayName(user.role)})
              </Typography>
              <IconButton
                size="large"
                aria-label="account menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                  {user.avatar || user.name.charAt(0)}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                  <AccountCircle sx={{ mr: 1 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
