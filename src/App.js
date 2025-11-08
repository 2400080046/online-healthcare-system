import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useAuth } from './hooks/useAuth';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import PharmacyDashboard from './pages/PharmacyDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Theme Wrapper Component
const AppContent = () => {
  const { darkMode } = useTheme();

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
  });

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/*"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/*"
            element={
              <ProtectedRoute>
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pharmacy/*"
            element={
              <ProtectedRoute>
                <PharmacyDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </MUIThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
