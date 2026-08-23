import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Shell } from './components/layout/Shell';
import { Dashboard } from './pages/Dashboard';
import { CustomersList } from './pages/CustomersList';
import { POS } from './pages/POS';

function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomersList />} />
          <Route path="/pos" element={<POS />} />
          {/* Fallbacks for prototyped navigation items */}
          <Route path="/appointments" element={<div className="p-8"><h1 className="text-2xl font-bold">Appointments</h1><p className="text-slate mt-2">Module pending implementation.</p></div>} />
          <Route path="/clinical" element={<div className="p-8"><h1 className="text-2xl font-bold">Clinical Operations</h1><p className="text-slate mt-2">Module pending implementation.</p></div>} />
          <Route path="/inventory" element={<div className="p-8"><h1 className="text-2xl font-bold">Inventory Management</h1><p className="text-slate mt-2">Module pending implementation.</p></div>} />
          <Route path="/sales" element={<div className="p-8"><h1 className="text-2xl font-bold">Sales History</h1><p className="text-slate mt-2">Module pending implementation.</p></div>} />
          <Route path="/settings" element={<div className="p-8"><h1 className="text-2xl font-bold">System Settings</h1><p className="text-slate mt-2">Module pending implementation.</p></div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
