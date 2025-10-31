import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { CategoriesPage } from '@/pages/CategoriesPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { ShoppingListPage } from '@/pages/ShoppingListPage';
import { TransactionsPage } from '@/pages/TransactionsPage';

import { Layout } from './components/layout/layout';
import { AccountManagement } from './pages/AccountManagement';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { PrivateRoute } from './pages/PrivateRoute';
import { UserRoute } from './pages/UserRoute';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/shopping-list" element={<ShoppingListPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route element={<UserRoute />}>
              <Route path="/account/:id" element={<AccountManagement />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
