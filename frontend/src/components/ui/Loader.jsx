export default function Loader({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-5 h-5 border-2', md: 'w-9 h-9 border-2', lg: 'w-12 h-12 border-[3px]' };
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-slate-700 border-t-indigo-500 rounded-full animate-spin`} />
    </div>
  );
}
