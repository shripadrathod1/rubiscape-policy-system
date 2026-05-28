import { Link } from 'react-router-dom';
import { Eye, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import PolicyStatusBadge from './PolicyStatusBadge';
import PolicyTypeBadge from './PolicyTypeBadge';
import Button from '../ui/Button';

const ACTION_CHIP = {
  allow: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  deny:  'text-rose-400   bg-rose-500/10   border-rose-500/20',
  alert: 'text-amber-400  bg-amber-500/10  border-amber-500/20',
};

const COLS = ['Policy Name', 'Type', 'Action', 'Status', 'Ver.', 'Operations'];

export default function PolicyTable({ policies, onToggle, onDelete, loadingIds = new Set() }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            {COLS.map((h) => (
              <th
                key={h}
                className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800/60">
          {policies.map((p) => {
            const actionCls = ACTION_CHIP[p.action] ?? 'text-slate-400 bg-slate-700/40 border-slate-600/30';
            return (
              <tr key={p._id} className="hover:bg-slate-800/30 transition-colors group">
                {/* Name */}
                <td className="px-4 py-3.5 max-w-[240px]">
                  <p className="font-medium text-slate-100 group-hover:text-indigo-300 transition-colors truncate">
                    {p.name}
                  </p>
                  {p.description && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{p.description}</p>
                  )}
                </td>

                {/* Type */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <PolicyTypeBadge type={p.type} />
                </td>

                {/* Action */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border uppercase tracking-wide ${actionCls}`}>
                    {p.action}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <PolicyStatusBadge status={p.status} />
                </td>

                {/* Version */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-xs text-slate-500 font-mono">v{p.version}</span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Link to={`/policies/${p._id}`}>
                      <Button variant="ghost" size="sm" icon={Eye} title="View details" />
                    </Link>
                    <Link to={`/policies/${p._id}/edit`}>
                      <Button variant="ghost" size="sm" icon={Pencil} title="Edit policy" />
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      loading={loadingIds.has(p._id)}
                      icon={p.status === 'active' ? ToggleRight : ToggleLeft}
                      title="Toggle status"
                      className={p.status === 'active' ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-500'}
                      onClick={() => onToggle(p._id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={Trash2}
                      title="Delete policy"
                      className="hover:text-rose-400 hover:bg-rose-500/10"
                      onClick={() => onDelete(p._id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
