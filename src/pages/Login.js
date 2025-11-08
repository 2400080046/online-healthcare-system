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
  CircularProgress
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error, isAuthenticated } = useAuth();
  const [loginError, setLoginError] = useState(null);

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
    setLoginError(null);
    const result = await login(data.email, data.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setLoginError(result.error || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
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
          Sign in to your account
        </Typography>

        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {(error || loginError) && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error || loginError}
              </Alert>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                component="button"
                type="button"
                variant="body2"
                onClick={() => navigate('/register')}
              >
                Don't have an account? Sign Up
              </Link>
            </Box>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" display="block" gutterBottom>
                <strong>Demo Credentials:</strong>
              </Typography>
              <Typography variant="caption" display="block">
                Admin: admin@medical.com / admin123
              </Typography>
              <Typography variant="caption" display="block">
                Doctor: doctor@medical.com / doctor123
              </Typography>
              <Typography variant="caption" display="block">
                Patient: patient@medical.com / patient123
              </Typography>
              <Typography variant="caption" display="block">
                Pharmacist: pharmacist@medical.com / pharmacist123
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
