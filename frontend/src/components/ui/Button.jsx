import { Loader2 } from 'lucide-react';

const VARIANTS = {
  primary:   'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-sm hover:shadow-md hover:scale-105',
  secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50',
  danger:    'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
  success:   'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100',
  ghost:     'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
};

export default function Button({
  children,
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  disabled,
  className = '',
  icon: Icon,
  type      = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${VARIANTS[variant] ?? VARIANTS.primary}
        ${SIZES[size] ?? SIZES.md}
        ${className}
      `}
      {...props}
    >
      {loading
        ? <Loader2 className="w-4 h-4 animate-spin" />
        : Icon
        ? <Icon className="w-4 h-4 flex-shrink-0" />
        : null}
      {children}
    </button>
  );
}
