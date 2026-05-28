import { useLocation } from 'react-router-dom';
import { Bell, UserCircle } from 'lucide-react';

const TITLES = {
  '/dashboard':       { title: 'Dashboard',        sub: 'Governance overview & analytics'   },
  '/policies':        { title: 'Policy Management', sub: 'View, filter, and manage policies' },
  '/policies/create': { title: 'Create Policy',     sub: 'Define a new governance rule'      },
};

function getPageMeta(pathname) {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.endsWith('/edit'))    return { title: 'Edit Policy',    sub: 'Modify an existing policy'       };
  if (/\/policies\/[^/]+$/.test(pathname)) return { title: 'Policy Detail', sub: 'Full policy information & rule JSON' };
  return { title: 'Rubiscape', sub: 'Governance Platform' };
}

export default function Topbar() {
  const { pathname } = useLocation();
  const { title, sub } = getPageMeta(pathname);

  return (
    <header className="flex-shrink-0 h-16 bg-slate-900/60 backdrop-blur-md border-b border-slate-800/70 px-6 flex items-center justify-between z-10">
      <div className="min-w-0">
        <h1 className="text-[15px] font-semibold text-slate-100 leading-none">{title}</h1>
        <p className="text-xs text-slate-500 mt-1 leading-none truncate">{sub}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button className="p-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800 transition-all">
          <Bell className="w-4.5 h-4.5" style={{ width: '1.1rem', height: '1.1rem' }} />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/50 cursor-default select-none">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <UserCircle className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm text-slate-300 font-medium">Admin</span>
          <span className="hidden sm:inline text-[10px] text-slate-600 font-medium bg-slate-700/60 px-1.5 py-0.5 rounded">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
