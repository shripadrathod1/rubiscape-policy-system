export default function Select({ label, error, id, options = [], placeholder = 'Select...', className = '', ...props }) {
  const borderCls = error
    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
    : 'border-gray-200 focus:border-indigo-400 focus:ring-indigo-100';

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full px-4 py-2.5 rounded-xl bg-white border text-gray-900 text-sm
          transition-all duration-200 focus:outline-none focus:ring-2
          ${borderCls} ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
