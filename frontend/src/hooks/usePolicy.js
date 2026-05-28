import { useState, useEffect, useCallback } from 'react';
import { policyService } from '../services/policyService';

export function usePolicy(id) {
  const [policy,  setPolicy]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchPolicy = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await policyService.getById(id);
      setPolicy(res.data.policy);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchPolicy(); }, [fetchPolicy]);

  return { policy, loading, error, refetch: fetchPolicy };
}
