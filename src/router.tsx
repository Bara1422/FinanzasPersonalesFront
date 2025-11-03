import ForgotPassword from './features/auth/pages/ForgotPassword';
import Register from './features/auth/pages/Register';
import Login from './features/auth/pages/Login';
import { createBrowserRouter, Navigate } from 'react-router';
import type { PropsWithChildren } from 'react';
import { useAuth } from './features/auth/hooks/useAuth';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { ShoppingListPage } from '@/pages/ShoppingListPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import App from './App';
import { Layout } from './components/layout/layout';
import { AccountManagement } from './pages/AccountManagement';

// Wrapper para rutas privadas
function Private({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// Definición de rutas
export const router = createBrowserRouter([
  // Rutas públicas (sin login)
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot', element: <ForgotPassword /> },

  // Rutas protegidas (requieren login)
  {
    element: (
      <Private>
        <Layout />
      </Private>
    ),
    children: [
      { index: true, element: <App /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/categories', element: <CategoriesPage /> },
      { path: '/shopping-list', element: <ShoppingListPage /> },
      { path: '/reports', element: <ReportsPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      { path: '/account/:id', element: <AccountManagement /> },
    ],
  },

  // Fallback: si no existe la ruta → redirige a login
  { path: '*', element: <Navigate to="/login" replace /> },
]);
