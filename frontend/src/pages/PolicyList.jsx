import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, X, SlidersHorizontal } from 'lucide-react';
import { usePolicies } from '../hooks/usePolicies';
import { useToast } from '../hooks/useToast';
import { policyService } from '../services/policyService';
import PageWrapper from '../components/layout/PageWrapper';
import PolicyTable from '../components/policy/PolicyTable';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { POLICY_TYPES, STATUS_OPTIONS } from '../utils/constants';

const PAGE_LIMIT = 8;

export default function PolicyList() {
  const navigate = useNavigate();
  const { policies, total, totalPages, loading, error, fetchPolicies, removePolicy, updatePolicyInList } = usePolicies();
  const { addToast } = useToast();

  const [page,          setPage]          = useState(1);
  const [search,        setSearch]        = useState('');
  const [typeFilter,    setTypeFilter]    = useState('');
  const [statusFilter,  setStatusFilter]  = useState('');
  const [deleteTarget,  setDeleteTarget]  = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loadingIds,    setLoadingIds]    = useState(new Set());

  const doFetch = useCallback(() => {
    fetchPolicies({
      page,
      limit:  PAGE_LIMIT,
      type:   typeFilter   || undefined,
      status: statusFilter || undefined,
    });
  }, [fetchPolicies, page, typeFilter, statusFilter]);

  useEffect(() => { doFetch(); }, [doFetch]);

  // Client-side name search
  const displayed = search.trim()
    ? policies.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : policies;

  const hasFilters = !!(typeFilter || statusFilter || search.trim());

  const clearFilters = () => { setSearch(''); setTypeFilter(''); setStatusFilter(''); setPage(1); };

  // Toggle
  const handleToggle = async (id) => {
    setLoadingIds((prev) => new Set([...prev, id]));
    try {
      const res = await policyService.toggle(id);
      updatePolicyInList(res.data.policy);
      addToast(`Status set to "${res.data.policy.status}"`, 'success');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoadingIds((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }
  };

  // Delete
  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      await policyService.remove(deleteTarget);
      removePolicy(deleteTarget);
      addToast('Policy deleted successfully', 'success');
      setDeleteTarget(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">All Policies</h2>
          <p className="text-sm text-slate-500 mt-0.5">{total} policies total</p>
        </div>
        <Button icon={Plus} onClick={() => navigate('/policies/create')}>
          New Policy
        </Button>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name…"
              className="w-full pl-9 pr-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0" />

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          >
            <option value="" className="bg-slate-900">All Types</option>
            {POLICY_TYPES.map((t) => (
              <option key={t.value} value={t.value} className="bg-slate-900">{t.label}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          >
            <option value="" className="bg-slate-900">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value} className="bg-slate-900">{s.label}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"
            >
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        {loading ? (
          <Loader size="md" className="py-20" />
        ) : error ? (
          <div className="text-center py-16 text-sm text-rose-400">{error}</div>
        ) : displayed.length === 0 ? (
          <EmptyState
            title="No policies found"
            description={
              hasFilters
                ? 'Try adjusting your filters or clearing the search.'
                : 'Create your first governance policy to get started.'
            }
            action={!hasFilters ? () => navigate('/policies/create') : undefined}
            actionLabel="Create Policy"
          />
        ) : (
          <>
            <PolicyTable
              policies={displayed}
              onToggle={handleToggle}
              onDelete={(id) => setDeleteTarget(id)}
              loadingIds={loadingIds}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3.5 border-t border-slate-800 bg-slate-900/50">
                <p className="text-xs text-slate-500">
                  Page {page} of {totalPages} · {total} total
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3.5 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-3.5 py-1.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete confirmation */}
      <Modal
        open={!!deleteTarget}
        title="Delete Policy"
        message="This policy will be permanently deleted. This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmLabel="Delete Policy"
        loading={deleteLoading}
      />
    </PageWrapper>
  );
}
