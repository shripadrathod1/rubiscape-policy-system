export default function LogicSelector({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-0.5 p-1 bg-slate-800 rounded-lg border border-slate-700">
      {['AND', 'OR'].map((logic) => (
        <button
          key={logic}
          type="button"
          onClick={() => onChange(logic)}
          className={`
            px-3.5 py-1 rounded-md text-xs font-bold tracking-widest transition-all duration-200
            ${value === logic
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40'
              : 'text-slate-500 hover:text-slate-200'}
          `}
        >
          {logic}
        </button>
      ))}
    </div>
  );
}
