import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Shield,
  PlusCircle,
  ChevronRight,
  Layers,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',       label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/policies',        label: 'All Policies',  icon: Shield          },
  { to: '/policies/create', label: 'Create Policy', icon: PlusCircle      },
];

export default function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 flex flex-col bg-slate-900 border-r border-slate-800/70 overflow-y-auto">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/50 flex-shrink-0">
            <Layers className="w-4.5 h-4.5 text-white" style={{ width: '1.1rem', height: '1.1rem' }} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-100 tracking-wide leading-none">Rubiscape</p>
            <p className="text-[10px] text-indigo-400/70 uppercase tracking-widest mt-0.5">Governance</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600 select-none">
          Navigation
        </p>
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
              transition-all duration-200 group
              ${isActive
                ? 'bg-indigo-600/15 text-indigo-300 ring-1 ring-indigo-600/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'}
            `}
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-500/60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-slate-800/70">
        <p className="text-[10px] text-slate-600 text-center leading-relaxed">
          Rubiscape v2.0<br />Policy Governance Module
        </p>
      </div>
    </aside>
  );
}
