import { useEffect } from 'react';
import './App.css';
import { Toaster } from './components/ui/sonner';
import { AppRoutes } from './router';
import { useAuthStore } from './store/authStore';

function App() {
  const fetchUserData = useAuthStore((state) => state.fetchUserData);
  const token = useAuthStore((state) => state.token);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

  if (token && isHydrated === false && !useAuthStore.getState().usuario) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
