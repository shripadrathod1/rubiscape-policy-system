import { Trash2 } from 'lucide-react';
import { OPERATORS } from '../../utils/constants';

const fieldCls = (hasError) => `
  w-full px-3 py-2 rounded-lg bg-slate-800/60 border text-slate-100
  placeholder-slate-600 text-sm transition-all focus:outline-none focus:ring-1
  ${hasError
    ? 'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20'
    : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'}
`;

export default function ConditionRow({ condition, index, onChange, onRemove, canRemove, error = {} }) {
  const update = (key, val) => onChange(index, { ...condition, [key]: val });

  return (
    <div className="flex items-start gap-2 animate-fade-in">
      {/* Field */}
      <div className="flex-1">
        <input
          value={condition.field}
          onChange={(e) => update('field', e.target.value)}
          placeholder="e.g. user_role"
          className={fieldCls(!!error.field)}
        />
        {error.field && <p className="text-[11px] text-rose-400 mt-0.5">{error.field}</p>}
      </div>

      {/* Operator */}
      <div className="w-44 flex-shrink-0">
        <select
          value={condition.operator}
          onChange={(e) => update('operator', e.target.value)}
          className={fieldCls(!!error.operator)}
        >
          <option value="" className="bg-slate-900">Operator…</option>
          {OPERATORS.map((op) => (
            <option key={op.value} value={op.value} className="bg-slate-900">
              {op.label}
            </option>
          ))}
        </select>
        {error.operator && <p className="text-[11px] text-rose-400 mt-0.5">{error.operator}</p>}
      </div>

      {/* Value */}
      <div className="flex-1">
        <input
          value={condition.value}
          onChange={(e) => update('value', e.target.value)}
          placeholder="e.g. admin"
          className={fieldCls(!!error.value)}
        />
        {error.value && <p className="text-[11px] text-rose-400 mt-0.5">{error.value}</p>}
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(index)}
        disabled={!canRemove}
        title="Remove condition"
        className="mt-2 p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-all disabled:opacity-25 disabled:cursor-not-allowed flex-shrink-0"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
