import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { PolicyProvider } from './context/PolicyContext';
import AppRoutes from './routes/AppRoutes';
import Toast from './components/ui/Toast';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <PolicyProvider>
          <AppRoutes />
          <Toast />
        </PolicyProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
