# Troubleshooting Guide

## App Not Working - Common Issues and Solutions

### 1. Server Not Running
**Problem:** App doesn't load in browser

**Solution:**
```bash
npm start
```
The app should open at `http://localhost:3000`

### 2. Dependencies Not Installed
**Problem:** Module not found errors

**Solution:**
```bash
npm install
```

### 3. Port Already in Use
**Problem:** Port 3000 is already in use

**Solution:**
- Kill the process using port 3000
- Or use a different port: `set PORT=3001 && npm start`

### 4. Browser Console Errors
**Problem:** Check browser console (F12) for errors

**Common Errors:**
- **Module not found:** Run `npm install`
- **Cannot read property:** Check if data is loaded before accessing
- **TypeError:** Check data types in API calls

### 5. Login Issues
**Problem:** Can't log in

**Solution:** Use these demo credentials:
- Admin: `admin@medical.com` / `admin123`
- Doctor: `doctor@medical.com` / `doctor123`
- Patient: `patient@medical.com` / `patient123`
- Pharmacist: `pharmacist@medical.com` / `pharmacist123`

### 6. Empty Dashboard
**Problem:** Dashboard shows no data

**Solution:**
- Check browser console for errors
- Verify user is logged in correctly
- Check if data is loading (network tab)
- Clear browser cache and localStorage

### 7. Type Mismatch Errors
**Problem:** Data not filtering correctly

**Solution:** Already fixed - userId is now converted to number in API calls

### 8. Build Errors
**Problem:** App won't compile

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### 9. React Router Issues
**Problem:** Routes not working

**Solution:** Already fixed - ProtectedRoute is now inside AuthProvider

### 10. Data Not Loading
**Problem:** Stats/appointments/prescriptions not showing

**Solution:**
- Check browser console for API errors
- Verify user ID matches mock data IDs
- Check DataContext is loading data correctly

## Quick Fix Checklist

1. ✅ Run `npm install` to install dependencies
2. ✅ Run `npm start` to start the server
3. ✅ Open `http://localhost:3000` in browser
4. ✅ Check browser console (F12) for errors
5. ✅ Clear browser cache and localStorage
6. ✅ Try logging in with demo credentials
7. ✅ Check network tab for API calls

## Current Status

All known issues have been fixed:
- ✅ Type comparison issues in API
- ✅ ProtectedRoute context issue
- ✅ Data loading race conditions
- ✅ Patient dashboard empty issue
- ✅ Import errors

The app should be working now!

