import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Avatar,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  role: yup.string().required('Role is required')
});

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error, isAuthenticated } = useAuth();
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setRegisterError(null);
    const { confirmPassword, ...userData } = data;
    const result = await registerUser(userData);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setRegisterError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 64, height: 64 }}>
            <LocalHospitalIcon sx={{ fontSize: 40 }} />
          </Avatar>
        </motion.div>
        
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Medical System
        </Typography>
        <Typography component="h2" variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Create your account
        </Typography>

        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {(error || registerError) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error || registerError}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                {...register('role')}
                error={!!errors.role}
                defaultValue=""
              >
                <MenuItem value="patient">Patient</MenuItem>
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="pharmacist">Pharmacist</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
              {errors.role && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.75 }}>
                  {errors.role.message}
                </Typography>
              )}
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate('/login')}
              >
                Already have an account? Sign In
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;
