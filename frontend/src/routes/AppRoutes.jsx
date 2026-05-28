import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import Dashboard from '../pages/Dashboard';
import PolicyList from '../pages/PolicyList';
import CreatePolicy from '../pages/CreatePolicy';
import EditPolicy from '../pages/EditPolicy';
import PolicyDetail from '../pages/PolicyDetail';

export default function AppRoutes() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/"                  element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard"         element={<Dashboard />}    />
            <Route path="/policies"          element={<PolicyList />}   />
            <Route path="/policies/create"   element={<CreatePolicy />} />
            <Route path="/policies/:id"      element={<PolicyDetail />} />
            <Route path="/policies/:id/edit" element={<EditPolicy />}   />
            <Route path="*"                  element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
