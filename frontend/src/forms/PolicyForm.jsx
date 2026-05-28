import { useState } from 'react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';
import RuleBuilder from '../components/rulebuilder/RuleBuilder';
import { POLICY_TYPES, ACTIONS, STATUS_OPTIONS, DEFAULT_RULE } from '../utils/constants';
import { validatePolicy } from '../utils/validators';

export default function PolicyForm({ initialData, onSubmit, loading = false, submitLabel = 'Save Policy' }) {
  const [form, setForm] = useState({
    name:        initialData?.name        ?? '',
    description: initialData?.description ?? '',
    type:        initialData?.type        ?? '',
    rule:        initialData?.rule        ?? DEFAULT_RULE,
    action:      initialData?.action      ?? '',
    status:      initialData?.status      ?? 'inactive',
  });
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validatePolicy(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* ── Policy Information ─────────────────────────────────────── */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="pb-3 border-b border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Policy Information
          </h2>
        </div>

        <Input
          id="policy-name"
          label="Policy Name"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. Block Non-Admin Access to Sensitive Data"
          error={errors.name}
        />

        <Textarea
          id="policy-desc"
          label="Description (optional)"
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Briefly describe what this policy enforces…"
          rows={3}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            id="policy-type"
            label="Policy Type"
            value={form.type}
            onChange={(e) => set('type', e.target.value)}
            options={POLICY_TYPES}
            placeholder="Select type…"
            error={errors.type}
          />
          <Select
            id="policy-action"
            label="Action"
            value={form.action}
            onChange={(e) => set('action', e.target.value)}
            options={ACTIONS}
            placeholder="Select action…"
            error={errors.action}
          />
          <Select
            id="policy-status"
            label="Status"
            value={form.status}
            onChange={(e) => set('status', e.target.value)}
            options={STATUS_OPTIONS}
          />
        </div>
      </section>

      {/* ── Rule Builder ───────────────────────────────────────────── */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
        <div className="pb-3 border-b border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Rule Builder
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Define conditions that trigger this policy. Must have at least one condition.
          </p>
        </div>

        {errors.rule && (
          <p className="text-xs text-rose-400 font-medium">{errors.rule}</p>
        )}

        <RuleBuilder
          rule={form.rule}
          onChange={(rule) => {
            set('rule', rule);
            if (errors.conditions) setErrors((prev) => { const n = { ...prev }; delete n.conditions; return n; });
          }}
          conditionErrors={errors.conditions ?? []}
        />
      </section>

      {/* ── Submit ─────────────────────────────────────────────────── */}
      <div className="flex justify-end">
        <Button type="submit" loading={loading} size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
