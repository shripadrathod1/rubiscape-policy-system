export default function Textarea({ label, error, id, rows = 3, className = '', ...props }) {
  const borderClass = error
    ? 'border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20'
    : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`
          w-full px-3.5 py-2.5 rounded-lg bg-slate-800/50 border
          text-slate-100 placeholder-slate-500 text-sm resize-none
          transition-all duration-200 focus:outline-none focus:ring-2
          ${borderClass} ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}
