import { useContext } from 'react';
import { PolicyContext } from '../context/PolicyContext';

export function usePolicies() {
  const ctx = useContext(PolicyContext);
  if (!ctx) throw new Error('usePolicies must be used within PolicyProvider');
  return ctx;
}
