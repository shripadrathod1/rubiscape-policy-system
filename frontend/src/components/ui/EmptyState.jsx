import { FolderSearch } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  title       = 'No data found',
  description = 'Nothing to display here.',
  action,
  actionLabel = 'Get Started',
  icon: Icon  = FolderSearch,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="p-5 bg-slate-800/50 rounded-2xl mb-5 ring-1 ring-slate-700/50">
        <Icon className="w-10 h-10 text-slate-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-300 mb-1.5">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">{description}</p>
      {action && (
        <Button onClick={action} size="sm">{actionLabel}</Button>
      )}
    </div>
  );
}
