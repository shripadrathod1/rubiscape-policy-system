export default function PolicyStatusBadge({ status }) {
  const isActive = status === 'active';
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        text-xs font-medium border select-none
        ${isActive
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          : 'bg-slate-700/40 text-slate-400 border-slate-600/30'}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}
