# 🏥 Online Medical System

A comprehensive online medical system built with React, featuring role-based access for Admin, Doctor, Patient, and Pharmacist.

## Features

- **Role-Based Access Control**: Separate dashboards for Admin, Doctor, Patient, and Pharmacist
- **Virtual Consultations**: Book and manage appointments online
- **E-Prescriptions**: Digital prescription management
- **Patient Records**: View and manage medical history
- **Pharmacy Integration**: Process prescriptions and manage orders
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all devices
- **Data Visualization**: Charts and statistics for insights

## Tech Stack

- React 18
- React Router v6
- Material UI (MUI)
- Axios for API calls
- React Hook Form + Yup for validation
- Recharts for data visualization
- Framer Motion for animations

## Getting Started

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Demo Credentials

### Admin
- Email: `admin@medical.com`
- Password: `admin123`

### Doctor
- Email: `doctor@medical.com`
- Password: `doctor123`

### Patient
- Email: `patient@medical.com`
- Password: `patient123`

### Pharmacist
- Email: `pharmacist@medical.com`
- Password: `pharmacist123`

## Project Structure

```
/src
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/        # React Context providers
├── hooks/          # Custom React hooks
├── utils/          # Utility functions and mock data
├── App.js          # Main app component
└── index.js        # Entry point
```

## License

MIT
