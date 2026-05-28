import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Pencil, Trash2, ToggleLeft, ToggleRight,
  Calendar, Hash, Zap, GitBranch,
} from 'lucide-react';
import { usePolicy } from '../hooks/usePolicy';
import { useToast } from '../hooks/useToast';
import { policyService } from '../services/policyService';
import PageWrapper from '../components/layout/PageWrapper';
import PolicyStatusBadge from '../components/policy/PolicyStatusBadge';
import PolicyTypeBadge from '../components/policy/PolicyTypeBadge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Loader from '../components/ui/Loader';

const ACTION_PILL = {
  allow: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
  deny:  'text-rose-400   bg-rose-500/10   border border-rose-500/20',
  alert: 'text-amber-400  bg-amber-500/10  border border-amber-500/20',
};

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

export default function PolicyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { policy, loading, error, refetch } = usePolicy(id);

  const [toggling,      setToggling]      = useState(false);
  const [deleteOpen,    setDeleteOpen]    = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleToggle = async () => {
    setToggling(true);
    try {
      await policyService.toggle(id);
      addToast('Policy status updated', 'success');
      refetch();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setToggling(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await policyService.remove(id);
      addToast('Policy deleted', 'success');
      navigate('/policies');
    } catch (err) {
      addToast(err.message, 'error');
      setDeleteLoading(false);
    }
  };

  if (loading) return <Loader size="lg" className="mt-24" />;
  if (error || !policy)
    return (
      <div className="text-center mt-24">
        <p className="text-rose-400 text-sm mb-4">{error ?? 'Policy not found'}</p>
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate('/policies')}>
          Back to list
        </Button>
      </div>
    );

  return (
    <PageWrapper>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-start gap-3 min-w-0">
            <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate('/policies')} className="mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-slate-100 leading-snug">{policy.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <PolicyTypeBadge   type={policy.type}     />
                <PolicyStatusBadge status={policy.status} />
                <span className="text-xs text-slate-600 font-mono">v{policy.version}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
            <Button
              variant={policy.status === 'active' ? 'success' : 'secondary'}
              size="sm"
              loading={toggling}
              icon={policy.status === 'active' ? ToggleRight : ToggleLeft}
              onClick={handleToggle}
            >
              {policy.status === 'active' ? 'Deactivate' : 'Activate'}
            </Button>
            <Link to={`/policies/${id}/edit`}>
              <Button variant="secondary" size="sm" icon={Pencil}>Edit</Button>
            </Link>
            <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeleteOpen(true)}>
              Delete
            </Button>
          </div>
        </div>

        {/* Body: 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* ── Left column ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Description */}
            {policy.description && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-2">
                  Description
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">{policy.description}</p>
              </div>
            )}

            {/* Rule breakdown */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Rule Conditions
                </p>
                <span className="px-2 py-0.5 rounded bg-indigo-600/20 text-indigo-400 text-xs font-bold border border-indigo-600/30">
                  {policy.rule.logic}
                </span>
              </div>

              <div className="space-y-2">
                {policy.rule.conditions.map((c, i) => (
                  <div key={i}>
                    {i > 0 && (
                      <div className="flex items-center gap-2 my-1.5">
                        <div className="h-px flex-1 bg-slate-800" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                          {policy.rule.logic}
                        </span>
                        <div className="h-px flex-1 bg-slate-800" />
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-4 py-3">
                      <span className="font-mono text-sm font-semibold text-indigo-300">{c.field}</span>
                      <span className="px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-400 font-mono text-xs">
                        {c.operator}
                      </span>
                      <span className="font-mono text-sm font-semibold text-emerald-300">"{c.value}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Raw JSON */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-900/80">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                  Raw JSON
                </p>
                <span className="text-[10px] font-mono text-slate-600">policy.json</span>
              </div>
              <pre className="px-5 py-4 text-xs text-slate-300 overflow-x-auto leading-relaxed font-mono">
                {JSON.stringify(policy, null, 2)}
              </pre>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                Details
              </p>

              <div>
                <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-1.5">
                  <Zap className="w-3 h-3" /> Action
                </p>
                <span className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide ${ACTION_PILL[policy.action] ?? ''}`}>
                  {policy.action}
                </span>
              </div>

              <div>
                <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-1">
                  <Hash className="w-3 h-3" /> Version
                </p>
                <p className="text-sm text-slate-200 font-semibold font-mono">v{policy.version}</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-1">
                  <GitBranch className="w-3 h-3" /> Conditions
                </p>
                <p className="text-sm text-slate-200">
                  {policy.rule.conditions.length} condition{policy.rule.conditions.length !== 1 ? 's' : ''}
                  {' · '}
                  <span className="text-indigo-400 font-semibold">{policy.rule.logic}</span>
                </p>
              </div>

              <div>
                <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3" /> Created
                </p>
                <p className="text-sm text-slate-200">{fmt(policy.createdAt)}</p>
              </div>

              <div>
                <p className="text-[11px] text-slate-600 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3 h-3" /> Last Updated
                </p>
                <p className="text-sm text-slate-200">{fmt(policy.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={deleteOpen}
        title="Delete Policy"
        message={`Permanently delete "${policy.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
        confirmLabel="Delete Policy"
        loading={deleteLoading}
      />
    </PageWrapper>
  );
}
