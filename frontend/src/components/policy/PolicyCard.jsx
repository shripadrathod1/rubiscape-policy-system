import { Link } from 'react-router-dom';
import { ChevronRight, Zap } from 'lucide-react';
import PolicyStatusBadge from './PolicyStatusBadge';
import PolicyTypeBadge from './PolicyTypeBadge';

const ACTION_DOT = {
  allow: 'bg-emerald-400',
  deny:  'bg-rose-400',
  alert: 'bg-amber-400',
};

export default function PolicyCard({ policy }) {
  return (
    <Link
      to={`/policies/${policy._id}`}
      className="block bg-slate-800/40 border border-slate-800 rounded-xl p-4 hover:border-indigo-500/40 hover:bg-slate-800/70 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
            {policy.name}
          </p>
          {policy.description && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{policy.description}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <PolicyTypeBadge type={policy.type} />
            <PolicyStatusBadge status={policy.status} />
            <span className="flex items-center gap-1 text-[11px] text-slate-600">
              <Zap className="w-3 h-3" />
              {policy.action}
            </span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors flex-shrink-0 mt-1" />
      </div>
    </Link>
  );
}
