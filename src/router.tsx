import { createBrowserRouter } from 'react-router';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { ShoppingListPage } from '@/pages/ShoppingListPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import App from './App';
import { Layout } from './components/layout/layout';
import { AccountManagement } from './pages/AccountManagement';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: '/transactions', element: <TransactionsPage /> },
      { path: '/categories', element: <CategoriesPage /> },
      { path: '/shopping-list', element: <ShoppingListPage /> },
      { path: '/reports', element: <ReportsPage /> },
      { path: '/notifications', element: <NotificationsPage /> },
      {path: '/account/:id', element: <AccountManagement />}
    ],
  },
]);
