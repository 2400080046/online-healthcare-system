import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

/**
 * Custom hook to access data context
 * @returns {Object} - Data context value
 */
export const useData = () => {
  const context = useContext(DataContext);
  
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  
  return context;
};
