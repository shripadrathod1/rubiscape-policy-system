import { Plus } from 'lucide-react';
import LogicSelector from './LogicSelector';
import ConditionRow from './ConditionRow';
import Button from '../ui/Button';

const EMPTY = { field: '', operator: '', value: '' };

export default function RuleBuilder({ rule, onChange, conditionErrors = [] }) {
  const setLogic = (logic) => onChange({ ...rule, logic });

  const setCondition = (index, updated) => {
    const next = [...rule.conditions];
    next[index] = updated;
    onChange({ ...rule, conditions: next });
  };

  const addCondition = () =>
    onChange({ ...rule, conditions: [...rule.conditions, { ...EMPTY }] });

  const removeCondition = (index) => {
    if (rule.conditions.length <= 1) return;
    onChange({ ...rule, conditions: rule.conditions.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-slate-500">Match conditions using</span>
          <LogicSelector value={rule.logic} onChange={setLogic} />
        </div>
        <Button type="button" variant="ghost" size="sm" icon={Plus} onClick={addCondition}>
          Add Condition
        </Button>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_176px_1fr_36px] gap-2 px-0.5">
        {['Field', 'Operator', 'Value', ''].map((h) => (
          <span key={h} className="text-[11px] font-semibold uppercase tracking-wider text-slate-600">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {rule.conditions.map((cond, i) => (
          <div key={i} className="relative">
            {i > 0 && (
              <div className="flex items-center gap-2 mb-1.5 ml-2">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest px-1">
                  {rule.logic}
                </span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>
            )}
            <ConditionRow
              condition={cond}
              index={i}
              onChange={setCondition}
              onRemove={removeCondition}
              canRemove={rule.conditions.length > 1}
              error={conditionErrors[i]}
            />
          </div>
        ))}
      </div>

      {/* Live JSON preview */}
      <div className="rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/50">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Live Rule Preview
          </span>
          <span className="text-[10px] font-mono text-slate-600">JSON</span>
        </div>
        <pre className="px-4 py-3.5 text-xs text-slate-300 overflow-x-auto leading-relaxed">
          {JSON.stringify(rule, null, 2)}
        </pre>
      </div>
    </div>
  );
}
