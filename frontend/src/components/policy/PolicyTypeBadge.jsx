const TYPE_CONFIG = {
  access_control: { label: 'Access Control', cls: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  data_quality:   { label: 'Data Quality',   cls: 'bg-amber-500/10  text-amber-400  border-amber-500/20'  },
  compliance:     { label: 'Compliance',     cls: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
};

export default function PolicyTypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] ?? { label: type, cls: 'bg-slate-700/40 text-slate-400 border-slate-600/30' };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border select-none ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}
