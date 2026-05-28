import { createContext, useState, useCallback } from 'react';
import { policyService } from '../services/policyService';

export const PolicyContext = createContext(null);

export function PolicyProvider({ children }) {
  const [policies,   setPolicies]   = useState([]);
  const [total,      setTotal]      = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);

  const fetchPolicies = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await policyService.getAll(params);
      setPolicies(res.data.policies);
      setTotal(res.data.total);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const removePolicy = useCallback((id) => {
    setPolicies((prev) => prev.filter((p) => p._id !== id));
    setTotal((prev) => Math.max(0, prev - 1));
  }, []);

  const updatePolicyInList = useCallback((updated) => {
    setPolicies((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
  }, []);

  return (
    <PolicyContext.Provider
      value={{ policies, total, totalPages, loading, error, fetchPolicies, removePolicy, updatePolicyInList }}
    >
      {children}
    </PolicyContext.Provider>
  );
}
